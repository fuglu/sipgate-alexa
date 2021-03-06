const Alexa = require('alexa-sdk');
const sipgate = require('./sipgate-rest.js');

const handlers = {

  BalanceIntent() {
    const rest = sipgate(this.event.session.user.accessToken);
    rest.balance((res) => {
      const balance = (res.amount / 10000).toFixed(2);
      this.emit(':tell', `Dein Guthaben bei sipgate beträgt ${balance}€`);
    });
  },
  LastVoicemailIntent() {
    const rest = sipgate(this.event.session.user.accessToken);
    rest.history((res) => {
      const url = res.items[0].recordingUrl;
      const token = 'LOLWHAT';
      const playBehavior = 'REPLACE_ALL';
      this.response.audioPlayerPlay(playBehavior, url, token, null, 0);
      this.emit(':responseReady');
    }, 0, 1, ['VOICEMAIL']);
  },
  LastVoicemailTextIntent() {
    const rest = sipgate(this.event.session.user.accessToken);
    rest.history((res) => {
      const text = res.items[0].transcription;
      this.emit(':tell', text);
    }, 0, 1, ['VOICEMAIL']);
  },
  // Weiterleitungen
  // Handy finden
  // Voicemails abspielen
  // DND an/aus
  // SMS schicken / vorlesen
  // Voicemailansage aufnehmen
  // satelite-nachrichten
  // Tarifansage ( was kostet es nach X zu telefonieren)
  // Durchwahlen und Rufnummern aus dem Adressbuch
  // unterstützt sipgate Land XY
  // Störungsstatus / liegt eine Störung vor?
  // letzten Blogpost vorlesen
  // Features / Rufnummern buchen
  // Wann ist die nächste Veranstaltung?
  // wie komme ich zu sipgate? -> Google Maps
  // kann ich schon bier trinken?
  // Alexa frag Hubot
  // Alexa anrufen
  // sipgate Folklore
  // offene Stellenanzeigen
  // Party Modus
  // Was gibt es zu essen?

};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
