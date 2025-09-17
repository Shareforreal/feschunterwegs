import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Datenschutz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Datenschutz | feschunterwegs</title>
      </Helmet>
      <div className="container-editorial py-16">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-editorial-600 hover:text-editorial-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Startseite
          </button>
          <h1 className="text-4xl font-light text-editorial-900 mb-4">Datenschutzerklärung</h1>
          <div className="text-sm text-editorial-600">
            <p>Mit dieser Datenschutzerklärung informieren wir euch darüber, welche personenbezogenen Daten wir im Rahmen unserer Tätigkeit als Reisevermittler erheben, wie wir sie nutzen und welche Rechte ihr habt. Wir behandeln eure Daten verantwortungsvoll und entsprechend der gesetzlichen Vorgaben, insbesondere der EU-Datenschutz-Grundverordnung (DSGVO).</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">1. Verantwortlicher</h2>
            <div className="space-y-4 text-editorial-700">
              <p><strong>Studio 177 GmbH</strong></p>
              <p>Baaderstraße 25 RGB</p>
              <p>80469 München</p>
              <p>Deutschland</p>
              <br/>
              <p><strong>Vertreten durch:</strong> Alessa Schuhmacher (Geschäftsführerin)</p>
              <p><strong>E-Mail:</strong> servus@feschunterwegs.com</p>
              <br/>
              <p>Ein gesonderter Datenschutzbeauftragter ist bei uns nicht bestellt, da die gesetzlichen Voraussetzungen hierfür nicht vorliegen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">2. Welche Daten wir verarbeiten</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Damit wir eure Reisebuchungen bearbeiten können, brauchen wir bestimmte Daten von euch. Das können je nach Leistung z. B. sein:</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Kontaktdaten (Name, Adresse, Telefonnummer, E-Mail)</li>
                <li>Buchungsdaten (gewählte Leistungen, Reisezeiten)</li>
                <li>Zahlungsdaten (z. B. IBAN, Kreditkarteninformationen)</li>
                <li>ggf. Reisedokumente (Passdaten, Geburtsdatum)</li>
                <li>besondere Angaben, falls sie für die Buchung notwendig sind (z. B. Ernährungswünsche, gesundheitliche Hinweise für Fluggesellschaften)</li>
              </ul>
              <p>Wir erheben nur die Daten, die zur Vertragsabwicklung notwendig sind oder zu deren Erhebung wir gesetzlich verpflichtet sind.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">3. Rechtsgrundlage</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Die Verarbeitung eurer Daten stützt sich auf folgende Rechtsgrundlagen:</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> zur Durchführung vorvertraglicher Maßnahmen und Erfüllung des Vertrages (z. B. Bearbeitung der Buchung).</li>
                <li><strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> zur Erfüllung rechtlicher Pflichten (z. B. steuerliche Aufbewahrungspflichten).</li>
                <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> zur Wahrung berechtigter Interessen (z. B. interne Abläufe, IT-Sicherheit).</li>
                <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> soweit ihr uns eine Einwilligung gebt (z. B. Newsletter).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">4. Weitergabe an Dritte</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Zur Erfüllung unserer Vermittlungsleistungen geben wir Daten an die jeweiligen Leistungsträger weiter, z. B.</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Reiseveranstalter, Fluggesellschaften, Hotels, Mietwagenanbieter, Versicherungen</li>
                <li>technische Dienstleister (z. B. Buchungssysteme, Zahlungsdienstleister, IT-Dienstleister)</li>
                <li>Behörden, soweit wir gesetzlich verpflichtet sind (z. B. Zoll, Einreisebestimmungen, Steuerbehörden).</li>
              </ul>
              <p>Eine Übermittlung in Länder außerhalb des Europäischen Wirtschaftsraums (Drittstaaten) erfolgt nur, wenn es für die Vertragsdurchführung erforderlich ist (z. B. Einreise in die USA) oder eine gesetzliche Verpflichtung besteht.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">5. Speicherdauer</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Wir speichern eure personenbezogenen Daten nur so lange, wie es für die Erfüllung des Vertrages und gesetzliche Aufbewahrungspflichten erforderlich ist. In der Regel gilt:</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Vertrags- und Buchungsdaten: bis zu 10 Jahre (steuerliche Pflicht)</li>
                <li>rein geschäftliche Kommunikation: bis zu 6 Jahre</li>
                <li>Daten auf Grundlage eurer Einwilligung (z. B. Newsletter): bis zum Widerruf.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">6. Eure Rechte</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Ihr habt jederzeit folgende Rechte:</p>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Auskunft über die gespeicherten Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung, soweit keine Aufbewahrungspflichten entgegenstehen</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Widerspruch gegen die Verarbeitung (insbesondere bei Direktwerbung)</li>
                <li>Datenübertragbarkeit</li>
                <li>Beschwerde bei einer zuständigen Datenschutzaufsichtsbehörde</li>
              </ul>
              <p>Alle Anfragen richtet ihr bitte an:</p>
              <p><strong>Studio 177 GmbH</strong> (Betreiber der Marke feschunterwegs)</p>
              <p>Baaderstraße 25 RGB, 80469 München</p>
              <p>E-Mail: servus@feschunterwegs.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">7. Widerspruchsrecht</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Wenn wir Daten auf Grundlage berechtigter Interessen verarbeiten, habt ihr das Recht, aus Gründen, die sich aus eurer besonderen Situation ergeben, dagegen Widerspruch einzulegen. Gegen Direktwerbung könnt ihr jederzeit widersprechen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">8. Datensicherheit</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Wir nutzen technische und organisatorische Maßnahmen, um eure Daten zu schützen (z. B. SSL-Verschlüsselung, Zugriffsbeschränkungen).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">9. Nutzung unserer Website</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Bei der Nutzung unserer Website werden automatisch technische Daten (z. B. IP-Adresse, Browser, Uhrzeit) durch den Server erfasst. Diese Daten nutzen wir ausschließlich für den sicheren Betrieb der Seite und zur Fehleranalyse.</p>
              
              <h3 className="text-xl font-semibold text-editorial-800 mt-6 mb-3">Cookies</h3>
              <p>Wir setzen Cookies nur ein, soweit sie technisch erforderlich sind. Darüber hinaus gehende Cookies (z. B. für Statistik oder Marketing) verwenden wir nur mit eurer Einwilligung.</p>
              
              <h3 className="text-xl font-semibold text-editorial-800 mt-6 mb-3">Newsletter</h3>
              <p>Wenn ihr unseren Newsletter abonniert, speichern wir eure E-Mail-Adresse und ggf. weitere freiwillige Angaben. Die Anmeldung erfolgt im Double-Opt-In-Verfahren. Ihr könnt den Newsletter jederzeit abbestellen.</p>
              
              <h3 className="text-xl font-semibold text-editorial-800 mt-6 mb-3">Eingebundene Dienste / Dritte</h3>
              <p>Falls wir Dienste wie Google Maps, Social Media oder Webanalyse-Tools nutzen, weisen wir euch gesondert im Cookie-Banner darauf hin und holen ggf. eure Einwilligung ein.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-editorial-900 mb-4">10. Änderungen dieser Datenschutzerklärung</h2>
            <div className="space-y-4 text-editorial-700">
              <p>Wir behalten uns vor, diese Datenschutzerklärung zu aktualisieren, wenn es aufgrund rechtlicher oder technischer Änderungen notwendig wird. Die jeweils aktuelle Fassung findet ihr jederzeit auf unserer Website.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
