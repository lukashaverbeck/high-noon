import { generateKey, generateDateString } from "./generate";

type EntryData = {
    date?: string;
    images?: string[];
    description?: string;
}

class Element {
    public readonly key: string;
    public readonly date: Date | null;
    public readonly images: string[] | null;
    public readonly description: string | null;

    public constructor(data: EntryData) {
        this.key = generateKey();
        this.date = data.date ? new Date(data.date) : null;
        this.images = data.images ? data.images : null;
        this.description = data.description ? data.description.trim() : null;
    }

    public readonly formatedDate = (showYear: boolean = true) => generateDateString(this.date, showYear);
}

const ENTRIES = [
    new Element({ description: "Ende November / Anfang Dezember treten in der Chinesischen Stadt Wuhan erste Fälle einer unbekantennten Lungenkrankheit auf. Die Krankheit wird durch einen neuartigen Coronavirus ausgelöst." }),
    new Element({ date: "2020-01-09", description: "Der erste erfasste Todesfall wird im Zusammenhang mit dem neuen Virus gemeldet." }),
    new Element({ date: "2020-01-27", description: "Im bayrischem Landkreis Starnberg wird die erste Erkrankung mit dem Corona-Virus gemeldet." }),
    new Element({ date: "2020-02-23", description: "Mehr als 150 Infektionen werden in Italien bestätigt. Das Land riegelt Städte im Norden ab." }),
    new Element({ date: "2020-03-04", description: "Die Leipziger Buchmesse wird abgesagt." }),
    new Element({ date: "2020-03-18", description: "In einer Fernsehansprache spricht Bundeskanzlerin Angela Merkel von einer \"Herausforderung von Historischem Ausmaß\" und mahnt zur Solidarität und Diziplin im Kampf gegen das neue Virus." }),
    new Element({ date: "2020-03-22", description: "Durch den Bund und die Länder, wird eine strenge Ausgangs- und Kontaktbeschränkung beschlossen." }),
    new Element({ description: "Um die Gefahr einer möglichen Ansteckung der Mitarbeiter zu verringern, wir das Büro mit einer provisorischen Wand geteilt. Zukünftig arbeitet die eine Hälfte des Büros auf der Nord- und die andere Hälfte auf der Südseite des Büros. Die Projektteams werden so organisiert, dass im Quarantänefall einer Büroseite die Projekte auch durch die andere Bürohälfte bearbeitet werden können." }),
    // new Element({ date: "2020-03-23", images: ["0323", "Foto-01"], description: "Klaus-Dieter hängt für jeden Tag der Trennung des Büros eines seiner Bilder an die provisorische Wand auf der Nordseite. Die Südseite des Büros hängt ebenfalls an jedem Tage ein Bild auf." }),
    new Element({ date: "2020-03-24", images: ["0324"] }),
    new Element({ date: "2020-03-25", images: ["0325"] }),
    new Element({ date: "2020-03-26", images: ["0326"] }),
    new Element({ date: "2020-03-27", images: ["0327"] }),
    new Element({ date: "2020-03-30", images: ["0330"] }),
    new Element({ date: "2020-03-31", images: ["0331"], description: "Rund 800.000 Menschen haben sich mitlerweile weltweit mit dem Virus infiziert." }),
    new Element({ date: "2020-04-01", images: ["0401"] }),
    new Element({ date: "2020-04-02", images: ["0402"] }),
    new Element({ date: "2020-04-03", images: ["0403"] }),
    new Element({ date: "2020-04-06", description: "Der Britsiche Premierminister Boris Johnson wird wegen einer Covid-19-Infektion auf einer Intensivstation behandelt." }),
    new Element({ date: "2020-04-06", images: ["0406"] }),
    new Element({ date: "2020-04-07", images: ["0407"] }),
    new Element({ date: "2020-04-08", images: ["0408", "Foto-02"], description: "Die Kommunikation zwischen den getrennten Bürohälften kann nur noch unter Wahrung der Hygieneabstände erfolgen." }),
    new Element({ date: "2020-04-09", images: ["0409"] }),
    new Element({ date: "2020-04-10", images: ["0410"] }),
    new Element({ date: "2020-04-13", images: ["0413"] }),
    new Element({ date: "2020-04-14", images: ["0414"] }),
    new Element({ date: "2020-04-15", images: ["0415"] }),
    new Element({ date: "2020-04-16", images: ["0416"] }),
    new Element({ date: "2020-04-17", images: ["0417"] }),
    new Element({ date: "2020-04-20", images: [], description: "Die ersten vorsichtigen Lockerungen der Corona-Schutzmaßnahmen werden von ofizieller Seite benannt." }),
    new Element({ date: "2020-04-20", images: ["0420"] }),
    new Element({ date: "2020-04-21", images: ["0421"] }),
    new Element({ date: "2020-04-22", images: ["0422"] }),
    new Element({ date: "2020-04-23", images: ["0423"] }),
    new Element({ date: "2020-04-24", description: "In den Bundesländern gilt inzwischen eine verpflichtung zum Tragen von Mund-  Und Nasenschutz bei Einkäufen und der Nutzung öffentlicher Verkehrsmittel." }),
    new Element({ date: "2020-04-24", images: ["0424", "Foto-03"], description: "Der Alltag wird schwieriger. Auch beim Bäcker muss eine Schutzmaske getragen werden." }),
    new Element({ date: "2020-04-27", images: ["0427"] }),
    new Element({ date: "2020-04-28", images: ["0428"] }),
    new Element({ date: "2020-04-29", images: ["0429"] }),
    new Element({ date: "2020-04-30", images: ["0430"] }),
    new Element({ date: "2020-05-04", images: ["0504"] }),
    // new Element({ date: "2020-05-05", images: ["0505"] }),
    new Element({ date: "2020-05-06", images: ["0506"] }),
    new Element({ date: "2020-05-06", description: "Bundeskanzlerin Angela Merkel kündigt weitere Lockerungen der Corona-Beschränkungen an." }),
    new Element({ date: "2020-05-07", images: ["0507"] }),
    new Element({ date: "2020-05-08", images: ["0508"] }),
    new Element({ date: "2020-05-11", images: ["0511"] }),
    new Element({ date: "2020-05-12", images: ["0512"] }),
    new Element({ date: "2020-05-13", images: ["0513"] }),
    new Element({ date: "2020-05-14", images: ["0514"] }),
    new Element({ date: "2020-05-15", images: ["0515"] }),
    new Element({ date: "2020-05-18", images: ["0518"] }),
    new Element({ date: "2020-05-19", description: "Seit ca. einer Woche liegt die Zahl der Neuinfektionen mit dem Coronavirus in Deutschland unter der Marke von 1000." }),
    new Element({ date: "2020-05-19", images: ["0519"] }),
    new Element({ date: "2020-05-20", images: ["0520"] }),
    new Element({ date: "2020-05-21", images: ["0521"] }),
    new Element({ date: "2020-05-22", images: ["0522"] }),
    new Element({ date: "2020-05-25", images: ["0525"] }),
    new Element({ date: "2020-05-26", images: ["0526"] }),
    new Element({ date: "2020-05-27", images: ["0527"] }),
    new Element({ date: "2020-05-28", images: ["0528"] }),
    new Element({ date: "2020-05-29", images: ["0529"] }),
    // new Element({ date: "2020-05-30", images: ["0530"] }),
    new Element({ date: "2020-06-01", images: ["0601"] }),
    new Element({ date: "2020-06-02", images: ["0602"] }),
    new Element({ date: "2020-06-03", images: ["0603"], description: "Durch die Bunderegierung wird ein Konjunkturpaket von rund 130 Milliarden Euro beschlossen, um die Wirtschaft wieder in Schwung zu bringen." }),
    // new Element({ date: "2020-06-06", images: ["0606"] }),
    // new Element({ date: "2020-06-07", images: ["0607"] }),
    new Element({ date: "2020-06-08", images: ["0608"], description: "Durch eine Studie wird die Wirksamkeit von Schutzmasken gegen das Coronavirus bestätigt." }),
    new Element({ date: "2020-06-09", images: ["0609"] }),
    new Element({ date: "2020-06-10", images: ["0610"] }),
    // new Element({ date: "2020-06-13", images: ["0613"] }),
    // new Element({ date: "2020-06-14", images: ["0614"] }),
    new Element({ date: "2020-06-15", images: ["0615"] }),
    new Element({ date: "2020-06-16", images: ["0616"], description: "Die deutsche Corona-War-App geht in Nutzung. Damit solle die Nachverfolgung von Infektionsketten verbessert werden." }),
    new Element({ date: "2020-06-18", images: ["0618", "Foto-04"], description: "\"Mauerfall\" im Büro. Um die internen Kommunikation wieder zu erleichtern, werden die beiden Bürohälften wieder vereint. Die Hygieneabstände werden durch die Arbeitsplatzanordnung ermöglicht." }),
    new Element({ images: ["Foto-05"], description: "Vielen Dank an das Team SUS und vielen Dank an alle am Bau Beteiligten, die in diesen schwierigen Zeiten auch auf den Baustellen dafür gesorgt haben, dass sich das Rad weiterdreht. Vielen Dank auch an unsere Bauherren die wir nurnoch in Videokonferenzen treffen konnten ..." }),
    new Element({ images: ["Foto-06"], description: "... und Vielen Dank auch an Klaus-Dieter, der uns mit seinen täglich aufgehängten Bildern die Zeit der Trennung ein wenig verkürzt hat." }),
] as const;

export default ENTRIES;
export type Entry = typeof ENTRIES[number];
