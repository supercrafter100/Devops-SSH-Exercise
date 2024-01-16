# Devops ssh keys oefening

Dit is een website die gebaseerd is op het oefenexamen van devops 2023-2024 om de mogelijheid te krijgen om voor het examen nog eens te oefenen van keys aan te maken, toevoegen aan de machine en te connecteren. Het is gemaakt met `Next.JS`, `TailwindCSS` en `next-auth` voor authenticatie.

![image](https://i.imgur.com/sCZ3rO3.png)

# Werking

## Voor de gebruker

Wanneer een gebruiker naar de website surft wordt deze automatisch omgeleid naar de login pagina. Hier kan men inloggen met zijn of haar github account. Indien dit is gelukt komt de gebruiker op de dashboard pagina terecht. Hier kan het adres, de gebruikersnaam en poort worden gevonden om met de machine te connecteren. Ook is er een veld voorzien om een public key in te geven en toe te voegen aan de machine. Ten slotte is er nog een knop voorzien om de bestaande sleutels van het account te verwijderen.

## Technische werking

Wanneer een request wordt gestuurt om een nieuwe key toe te voegen zal de backend automatisch een ssh verbinding openen naar me machine. Hier wordt automatisch een nieuw account worden aangemaakt. Dit nieuwe account krijg een ~/.ssh/authorized_keys bestand en hierin wordt dan de public key toegevoegd die is ingegeven in de website. De gebruikersnaam van het account is gelijk aan de username van het ingelogde github account zonder spaties. Wanneer de aanvraag wordt gestuurd om de sleutels te verwijderen wordt gewoon het authorized_keys bestand verwijderd en terug aangemaakt.

# Development

Om het project op te starten moeten de volgende stappen ondernomen worden:

1. Clone het project naar een directory
2. Voer `npm install` uit om al de dependencies te installeren
3. Kopieer de variabelen uit het `.example.env` bestand naar een `.env` bestand en vul deze in.
4. Start de applicatie in development mode door `npm run dev` uit te voeren

# Deployment

1. Voer eerst `npm run build` uit om de applicatie te bouwen voor productie
2. Vervolgens kan `npm run start` uitgevoerd worden om de webserver op te starten.
