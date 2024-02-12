
# Typescript module

Table of bulky waste collection for the city of Wroclaw, Poland.
https://gabaryty.ekosystem.wroc.pl/tabela-wywozu-odpadow/



Parser Table to page: waste collection table - Bulky waste collection schedule.

It takes html, parses and returns a json file with the data.

It is required to use the filter: street - with the name or part of the street name.

Example: 
Request: https://waste.home.dobrastronka.pl/?street=hal

[
...
    {
        id: 52,
        street: "al. gen. Hallera 140",
        date: "13-02-2024",
        estate: "Grabiszyn - Grabiszynek",
        geo: {
            lat: "51.090895116",
            lng: "16.987924107"
        }
    },
...
]


Used:
apicache - 1 day to not generate json every time
axios-cache - 4 h to not download the html file every time

Startup:

1. `docker compose up -d --build` - http://localhost:3333?street=hal
lub
2. `npm install` and then `npm run run` - http://localhost:3000?street=hal


Tests
`npm run test`

In gitHub actions set deploy to local ssh (send files, and `docker compose up -d --build`) when pushing to master.