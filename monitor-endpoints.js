#!/usr/bin/env node

/**
 * Continuous Monitoring Script for feschunterwegs.com
 * Monitors critical endpoints and sends alerts if they fail
 * 
 * Usage: node monitor-endpoints.js [--production] [--interval=300000]
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  production: {
    baseUrl: 'https://feschunterwegs.com',
    timeout: 10000
  },
  local: {
    baseUrl: 'http://localhost:5002',
    timeout: 5000
  }
};

class EndpointMonitor {
  constructor(environment = 'local', interval = 300000) { // 5 minutes default
    this.environment = environment;
    this.baseUrl = config[environment].baseUrl;
    this.timeout = config[environment].timeout;
    this.interval = interval;
    this.isRunning = false;
    this.consecutiveFailures = 0;
    this.maxConsecutiveFailures = 3;
    this.alertThreshold = 2;
    this.lastAlertTime = 0;
    this.alertCooldown = 300000; // 5 minutes between alerts
    this.logFile = path.join(__dirname, `monitor-${environment}-${Date.now()}.log`);
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
    const logMessage = `${prefix} [${timestamp}] ${message}`;
    
    console.log(logMessage);
    
    // Also log to file
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  async checkEndpoint(name, method, endpoint, data = null) {
    try {
      const startTime = Date.now();
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Endpoint-Monitor/1.0'
        }
      });
      
      const duration = Date.now() - startTime;
      
      if (response.status >= 200 && response.status < 300) {
        this.log(`${name}: OK (${response.status}) - ${duration}ms`, 'success');
        return { success: true, status: response.status, duration };
      } else {
        this.log(`${name}: WARNING (${response.status}) - ${duration}ms`, 'warning');
        return { success: false, status: response.status, duration };
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.log(`${name}: ERROR - ${error.message} (${duration}ms)`, 'error');
      return { 
        success: false, 
        error: error.message, 
        status: error.response?.status,
        duration 
      };
    }
  }

  async runHealthCheck() {
    this.log('Running health check...');
    
    const checks = [
      { name: 'Website', method: 'GET', endpoint: '/' },
      { name: 'Database Stats', method: 'GET', endpoint: '/api/stats' },
      { name: 'Quiz Endpoint', method: 'POST', endpoint: '/api/quiz', data: {
        email: 'monitor@feschunterwegs.com',
        answers: { test: 'monitor' }
      }},
      { name: 'Reservation Endpoint', method: 'POST', endpoint: '/api/reservation', data: {
        experience: 'Test Hotel',
        firstName: 'Monitor',
        lastName: 'Test',
        email: 'monitor@feschunterwegs.com',
        arrival: '2024-12-01',
        departure: '2024-12-03',
        guests: 1,
        termsAccepted: true
      }},
      { name: 'Newsletter Endpoint', method: 'POST', endpoint: '/api/exit-intent', data: {
        email: 'monitor@feschunterwegs.com'
      }}
    ];

    const results = [];
    let successCount = 0;

    for (const check of checks) {
      const result = await this.checkEndpoint(check.name, check.method, check.endpoint, check.data);
      results.push({ ...check, result });
      
      if (result.success) {
        successCount++;
      }
      
      // Wait 1 second between checks
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successRate = (successCount / checks.length) * 100;
    this.log(`Health check completed: ${successCount}/${checks.length} passed (${successRate.toFixed(1)}%)`);

    // Handle consecutive failures
    if (successCount < checks.length) {
      this.consecutiveFailures++;
      this.log(`Consecutive failures: ${this.consecutiveFailures}`, 'warning');
      
      if (this.consecutiveFailures >= this.maxConsecutiveFailures) {
        await this.sendAlert(`CRITICAL: ${this.consecutiveFailures} consecutive health check failures!`);
        this.consecutiveFailures = 0; // Reset after alert
      } else if (this.consecutiveFailures >= this.alertThreshold) {
        await this.sendAlert(`WARNING: ${this.consecutiveFailures} consecutive health check failures`);
      }
    } else {
      this.consecutiveFailures = 0;
    }

    return results;
  }

  async sendAlert(message) {
    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastAlertTime < this.alertCooldown) {
      this.log('Alert suppressed due to cooldown period', 'warning');
      return;
    }

    this.log(`ALERT: ${message}`, 'error');
    this.lastAlertTime = now;

    // Here you could integrate with:
    // - Email notifications
    // - Slack webhooks
    // - SMS services
    // - PagerDuty
    // - Custom webhook endpoints
    
    // For now, just log to file and console
    const alertData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      baseUrl: this.baseUrl,
      message,
      consecutiveFailures: this.consecutiveFailures
    };

    const alertFile = path.join(__dirname, `alert-${this.environment}-${Date.now()}.json`);
    fs.writeFileSync(alertFile, JSON.stringify(alertData, null, 2));
    this.log(`Alert details saved to: ${alertFile}`);
  }

  async start() {
    if (this.isRunning) {
      this.log('Monitor is already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.log(`Starting endpoint monitor for ${this.environment} environment`);
    this.log(`Monitoring: ${this.baseUrl}`);
    this.log(`Interval: ${this.interval / 1000} seconds`);
    this.log(`Log file: ${this.logFile}`);

    // Initial health check
    await this.runHealthCheck();

    // Set up interval
    this.intervalId = setInterval(async () => {
      try {
        await this.runHealthCheck();
      } catch (error) {
        this.log(`Health check error: ${error.message}`, 'error');
      }
    }, this.interval);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.log('Received SIGINT, shutting down gracefully...');
      this.stop();
    });

    process.on('SIGTERM', () => {
      this.log('Received SIGTERM, shutting down gracefully...');
      this.stop();
    });
  }

  stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.log('Endpoint monitor stopped');
    process.exit(0);
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const environment = args.includes('--production') ? 'production' : 'local';
  
  // Parse interval from args
  let interval = 300000; // 5 minutes default
  const intervalArg = args.find(arg => arg.startsWith('--interval='));
  if (intervalArg) {
    const value = parseInt(intervalArg.split('=')[1]);
    if (!isNaN(value) && value > 0) {
      interval = value * 1000; // Convert seconds to milliseconds
    }
  }

  const monitor = new EndpointMonitor(environment, interval);
  await monitor.start();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Monitor script failed:', error.message);
    process.exit(1);
  });
}

module.exports = EndpointMonitor;

