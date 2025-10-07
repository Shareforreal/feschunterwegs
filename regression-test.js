#!/usr/bin/env node

/**
 * Regression Test Script for feschunterwegs.com
 * Tests all critical submission endpoints to ensure they're working properly
 * 
 * Usage: node regression-test.js [--production]
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

// Test data
const testData = {
  quiz: {
    email: 'test@feschunterwegs.com',
    firstName: 'Test User',
    answers: {
      trip_type: 'romance',
      accommodation: 'luxury',
      must_have: ['culinary', 'wellness'],
      backdrop: 'mountains'
    },
    multipleSelections: {
      must_have: ['culinary', 'wellness']
    }
  },
  reservation: {
    experience: 'Hotel Kleiner Löwe',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@feschunterwegs.com',
    phone: '+49 123 456 789',
    arrival: '2024-12-01',
    departure: '2024-12-03',
    guests: 2,
    wishes: 'Test reservation for regression testing',
    termsAccepted: true,
    marketingAccepted: false
  },
  newsletter: {
    email: 'test@feschunterwegs.com',
    firstName: 'Test User'
  }
};

class RegressionTester {
  constructor(environment = 'local') {
    this.environment = environment;
    this.baseUrl = config[environment].baseUrl;
    this.timeout = config[environment].timeout;
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
    this.startTime = Date.now();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Regression-Test-Script/1.0'
        }
      });
      return { success: true, response };
    } catch (error) {
      return { 
        success: false, 
        error: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        }
      };
    }
  }

  async testQuizSubmission() {
    this.log('Testing Quiz Submission...');
    
    const result = await this.makeRequest('POST', '/api/quiz', testData.quiz);
    
    if (result.success && result.response.status === 200) {
      this.log('Quiz submission test PASSED', 'success');
      this.results.passed++;
      this.results.tests.push({
        name: 'Quiz Submission',
        status: 'PASSED',
        response: result.response.data
      });
      return true;
    } else {
      this.log(`Quiz submission test FAILED: ${result.error.message}`, 'error');
      this.results.failed++;
      this.results.tests.push({
        name: 'Quiz Submission',
        status: 'FAILED',
        error: result.error
      });
      return false;
    }
  }

  async testReservationSubmission() {
    this.log('Testing Experience Reservation...');
    
    const result = await this.makeRequest('POST', '/api/reservation', testData.reservation);
    
    if (result.success && result.response.status === 200) {
      this.log('Experience reservation test PASSED', 'success');
      this.results.passed++;
      this.results.tests.push({
        name: 'Experience Reservation',
        status: 'PASSED',
        response: result.response.data
      });
      return true;
    } else {
      this.log(`Experience reservation test FAILED: ${result.error.message}`, 'error');
      this.results.failed++;
      this.results.tests.push({
        name: 'Experience Reservation',
        status: 'FAILED',
        error: result.error
      });
      return false;
    }
  }

  async testNewsletterSubmission() {
    this.log('Testing Newsletter Subscription...');
    
    const result = await this.makeRequest('POST', '/api/exit-intent', testData.newsletter);
    
    if (result.success && result.response.status === 200) {
      this.log('Newsletter subscription test PASSED', 'success');
      this.results.passed++;
      this.results.tests.push({
        name: 'Newsletter Subscription',
        status: 'PASSED',
        response: result.response.data
      });
      return true;
    } else {
      this.log(`Newsletter subscription test FAILED: ${result.error.message}`, 'error');
      this.results.failed++;
      this.results.tests.push({
        name: 'Newsletter Subscription',
        status: 'FAILED',
        error: result.error
      });
      return false;
    }
  }

  async testDatabaseConnection() {
    this.log('Testing Database Connection...');
    
    const result = await this.makeRequest('GET', '/api/stats');
    
    if (result.success && result.response.status === 200) {
      this.log('Database connection test PASSED', 'success');
      this.results.passed++;
      this.results.tests.push({
        name: 'Database Connection',
        status: 'PASSED',
        response: result.response.data
      });
      return true;
    } else {
      this.log(`Database connection test FAILED: ${result.error.message}`, 'error');
      this.results.failed++;
      this.results.tests.push({
        name: 'Database Connection',
        status: 'FAILED',
        error: result.error
      });
      return false;
    }
  }

  async testWebsiteAvailability() {
    this.log('Testing Website Availability...');
    
    const result = await this.makeRequest('GET', '/');
    
    if (result.success && result.response.status === 200) {
      this.log('Website availability test PASSED', 'success');
      this.results.passed++;
      this.results.tests.push({
        name: 'Website Availability',
        status: 'PASSED',
        response: { status: result.response.status }
      });
      return true;
    } else {
      this.log(`Website availability test FAILED: ${result.error.message}`, 'error');
      this.results.failed++;
      this.results.tests.push({
        name: 'Website Availability',
        status: 'FAILED',
        error: result.error
      });
      return false;
    }
  }

  async runAllTests() {
    this.log(`Starting regression tests for ${this.environment} environment...`);
    this.log(`Testing against: ${this.baseUrl}`);
    
    const tests = [
      () => this.testWebsiteAvailability(),
      () => this.testDatabaseConnection(),
      () => this.testQuizSubmission(),
      () => this.testReservationSubmission(),
      () => this.testNewsletterSubmission()
    ];

    for (const test of tests) {
      try {
        await test();
        // Wait 1 second between tests to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        this.log(`Test error: ${error.message}`, 'error');
      }
    }

    this.generateReport();
  }

  generateReport() {
    const duration = Date.now() - this.startTime;
    const successRate = this.results.passed / (this.results.passed + this.results.failed) * 100;
    
    this.log('\n' + '='.repeat(60));
    this.log('REGRESSION TEST REPORT');
    this.log('='.repeat(60));
    this.log(`Environment: ${this.environment}`);
    this.log(`Base URL: ${this.baseUrl}`);
    this.log(`Duration: ${duration}ms`);
    this.log(`Tests Passed: ${this.results.passed}`);
    this.log(`Tests Failed: ${this.results.failed}`);
    this.log(`Success Rate: ${successRate.toFixed(1)}%`);
    this.log('='.repeat(60));
    
    this.results.tests.forEach(test => {
      const status = test.status === 'PASSED' ? '✅' : '❌';
      this.log(`${status} ${test.name}: ${test.status}`);
      
      if (test.status === 'FAILED' && test.error) {
        this.log(`   Error: ${test.error.message}`);
        if (test.error.status) {
          this.log(`   Status: ${test.error.status}`);
        }
      }
    });
    
    this.log('='.repeat(60));
    
    // Save detailed report to file
    const reportPath = path.join(__dirname, `regression-report-${this.environment}-${Date.now()}.json`);
    const reportData = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      baseUrl: this.baseUrl,
      duration,
      summary: {
        passed: this.results.passed,
        failed: this.results.failed,
        successRate
      },
      tests: this.results.tests
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    this.log(`Detailed report saved to: ${reportPath}`);
    
    // Exit with appropriate code
    if (this.results.failed > 0) {
      this.log('❌ REGRESSION TESTS FAILED - Some critical functionality is broken!', 'error');
      process.exit(1);
    } else {
      this.log('✅ ALL REGRESSION TESTS PASSED - System is working correctly!', 'success');
      process.exit(0);
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const environment = args.includes('--production') ? 'production' : 'local';
  
  const tester = new RegressionTester(environment);
  await tester.runAllTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Regression test script failed:', error.message);
    process.exit(1);
  });
}

module.exports = RegressionTester;

