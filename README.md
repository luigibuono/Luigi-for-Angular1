<h1><strong>#5 S2I</strong></h1>

# Luigi-for-Angular1

Deploy su netlify : https://firstprojectangular1.netlify.app/




<h1> Tutti i passaggi effettuati per questo progetto : </h1>
<br>
Creare una cartella, aprirla su vscode e digitare nel terminale ng new (nomeprogetto),subito dopo installa ng add @angular/material.
Per prima cosa ho creato un file model.ts contenente 3 interfacce con i dati utili per User,Post e Comment.
Poi ho creato il componente per il login con un semplice form e validatori per email,nome e token.
Nel TS il salvataggio del nuovo utente con il token generato nel localStorage.
Dopodiche ho creato una barra di navigazione con le ruotes per collegare alle sezioni: users,posts e my socials e un pulsante per il logout.
Tramite altri due componenti ho creato altre due sezioni per la creazione di un nuovo utente e un altro per la creazione di un nuovo post.Per non portarla a lungo vi illustrerò solo i ts,
creiamo oggetto newUser per user e newPost per i post, nel costruttore un router e un httpservice che vi dirò più avanti.
Nel metodo inizializziamo il nostro oggetto precedente User e tramite richiesta http prendiamo newpost(nuovo valore e id utente), reindirizziamo il router navigate sui posts, per la creazione degli users facciamo lo stesso procedimento ma senza dare conto all'oggetto creato in precedenza e salvato nel localStorage, e mandiamo il router navigate alla sezione users.
Nel componente mysocial cè poco da dire ,semplici pulsanti con collegamenti socials.
Procediamo con i dettagli sui post e sugli utenti,in html sezione per verificare se ci sono già dei posts/comments e visualizzarli più sezione per aggiungere nuovi commenti (nel ts tramite id_post per essere inerenti ai vari posts.
Mentre in user html con edit user, delete user , visualizza commenti e visualizza posts(metodi presenti sul ts)
Componenti list utenti e posts creati con metodo GET per visualizzarle + paginator di angular material per filtrare tramite valori inseriti.
Per concludere l'unico servizio utlizzato http-service con tutti i metodi creati , setHeaders per l'autorizzazione ad accedere al token dell'API, link su .env per prendere i dati dall'APi.
Sezione Test disponibile con ng test per la verifica dei componenti e servizio.
Clonare repository in local con GitDesktop,aprirlo su vscode,nel terminale npm install per pacchetti node modules e per finire ng serve per aprirla sul browser.
<br> 
<hr>
"dependencies": {
    "@angular/animations": "^16.1.0",
    "@angular/cdk": "^16.1.4",
    "@angular/common": "^16.1.0",
    "@angular/compiler": "^16.1.0",
    "@angular/core": "^16.1.0",
    "@angular/forms": "^16.1.0",
    "@angular/material": "^16.1.4",
    "@angular/platform-browser": "^16.1.0",
    "@angular/platform-browser-dynamic": "^16.1.0",
    "@angular/router": "^16.1.0",
    "ngx-cookie-service": "^16.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0"
  },

  <br>
  <hr>
  "devDependencies": {
    "@angular-devkit/build-angular": "^16.1.4",
    "@angular/cli": "~16.1.4",
    "@angular/compiler-cli": "^16.1.0",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.1.3"
  }

