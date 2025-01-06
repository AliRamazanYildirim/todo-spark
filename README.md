# ToDo-App

Eine moderne Aufgabenverwaltungsanwendung, entwickelt mit React, Node.js und PostgreSQL.

## 🚀 Funktionen

- Benutzerauthentifizierung (Registrierung und Anmeldung)
- Aufgaben erstellen, bearbeiten und löschen
- Fortschrittsanzeige für jede Aufgabe
- Einfache und intuitive Benutzeroberfläche

## 💻 Technologie-Stack

- **Frontend:**
  - React.js
  - react-cookie für Cookie-Verwaltung
  - Moderne UI-Komponenten
  
- **Backend:**
  - Node.js mit Express
  - PostgreSQL Datenbank
  - JWT für Authentifizierung
  - bcrypt für Passwort-Hashing

## 🔧 Installation

1. **Klonen Sie das Repository**
  
   ```bash  
   git clone [git@github.com:AliRamazanYildirim/todo-spark.git]
   ```

2. **Installieren Sie die Abhängigkeiten**

   ```bash
   # Frontend-Abhängigkeiten
   cd client
   bun install

   # Backend-Abhängigkeiten
   cd server
   bun install
   ```

3. **Backend-Abhängigkeiten**

   Die folgenden Abhängigkeiten werden im Backend verwendet:

    ```bash
    bcrypt: ^5.1.1
    cors: ^2.8.5
    dotenv: ^16.4.7
    express: ^4.21.2
    jsonwebtoken: ^9.0.2
    nanoid: ^5.0.9
    nodemon: ^3.1.9
    pg: ^8.13.1
    postgres: ^3.4.5
    uuid: ^11.0.3
    ```

4. **Fontend-Abhängigkeiten**

   Die folgenden Abhängigkeiten werden im Backend verwendet:

    ```bash
    dotenv: ^16.4.7
    react: ^19.0.0
    react-cookie: ^7.2.2
    react-dom: ^19.0.0
    ```

5. **Datenbank einrichten**
  
   ```sql
   # Führen Sie die SQL-Befehle aus data.sql aus
   CREATE DATABASE todoapp;

   CREATE TABLE todos (
       id VARCHAR(255) PRIMARY KEY,
       user_email VARCHAR(255),
       title VARCHAR(50),
       progress INT,
       date VARCHAR(300)
   );

   CREATE TABLE users (
       email VARCHAR(255) PRIMARY KEY,
       hashed_password VARCHAR(255)
   );
   ```

6. **Umgebungsvariablen konfigurieren**

   Erstellen Sie eine `.env`-Datei im Server-Verzeichnis:

   ```env
   DB_USER=ihr_datenbankbenutzer
   DB_PASSWORD=ihr_datenbankpasswort
   DB_HOST=ihr_datenbankhost
   DB_PORT=ihr_datenbankport
   DB_NAME=todoapp
   PORT=8000
   ```

    Erstellen Sie eine .env-Datei im client-Verzeichnis und fügen Sie die folgenden Umgebungsvariablen hinzu:

    ```env
    VITE_APP_SERVER_URL=http://localhost:8000
    ```

## 🚦 Anwendung starten

1. **Server starten**

   ```bash
   cd server
   bun start
   ```

2. **Frontend starten**

   ```bash
   cd client
   bun run dev
   ```

## 📝 Hauptkomponenten

### Frontend

- **Auth.jsx**: Verwaltet die Benutzerauthentifizierung
- **ListHeader.jsx**: Kopfzeile der Aufgabenliste mit Hinzufügen- und Abmelde-Funktion
- **ListItem.jsx**: Einzelne Aufgabenkomponente
- **Modal.jsx**: Modal-Fenster zum Erstellen und Bearbeiten von Aufgaben
- **ProgressBar.jsx**: Visualisierung des Aufgabenfortschritts
- **TickIcon.jsx**: Checkbox-Icon für Aufgaben

### Backend

- **server.js**: Hauptserver-Datei mit allen API-Endpunkten
- **db.js**: Datenbankverbindung und -konfiguration

## 🔒 API-Endpunkte

- `POST /signup`: Neue Benutzerregistrierung
- `POST /login`: Benutzeranmeldung
- `GET /todos/:userEmail`: Alle Aufgaben eines Benutzers abrufen
- `POST /todos`: Neue Aufgabe erstellen
- `PUT /todos/:id`: Aufgabe aktualisieren
- `DELETE /todos/:id`: Aufgabe löschen

## 🔐 Sicherheitsfunktionen

- Passwörter werden mit bcrypt gehasht
- JWT-Token-basierte Authentifizierung
- Geschützte API-Endpunkte
- Sichere Cookie-Verwaltung

## 📌 Wichtige Hinweise

- Stellen Sie sicher, dass PostgreSQL auf Ihrem System installiert und konfiguriert ist
- Alle Umgebungsvariablen müssen korrekt gesetzt sein
- Der Server muss auf Port 8000 laufen (oder einen anderen Port in der Umgebungskonfiguration angeben)
- Frontend-Entwicklungsserver läuft standardmäßig auf Port 5173
  
## 📝 Lizenz

🎓 MIT License

Copyright (c) [2024] [Ali Ramazan Yildirim]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
