// Alle Lektionen für den C-Kurs.
// Jede Lektion: { id, title, section, body (HTML), code (Beispiel), output (erwartete Ausgabe), quiz? }

window.LESSONS = [
  // ============================ GRUNDLAGEN ============================
  {
    id: 'hello-world',
    section: 'Grundlagen',
    title: 'Hallo, Welt!',
    body: `
      <p>Willkommen zum C-Kurs! In dieser ersten Lektion schreibst du dein erstes C-Programm.
      Das berühmte <em>"Hallo, Welt!"</em> gibt einen Text auf der Konsole aus und ist seit Jahrzehnten
      Tradition für jede neue Programmiersprache.</p>

      <h3>Aufbau eines C-Programms</h3>
      <ul>
        <li><code>#include &lt;stdio.h&gt;</code> bindet die Standard-Ein-/Ausgabe-Bibliothek ein.</li>
        <li><code>int main(void)</code> ist der Einstiegspunkt jedes C-Programms.</li>
        <li><code>printf</code> gibt Text aus. Das <code>\\n</code> erzeugt einen Zeilenumbruch.</li>
        <li><code>return 0;</code> signalisiert dem Betriebssystem, dass alles geklappt hat.</li>
      </ul>

      <h3>Kompilieren und Ausführen</h3>
      <p>Speichere den Code als <code>hallo.c</code> und übersetze ihn mit dem GCC:</p>
      <pre><code class="language-bash">gcc hallo.c -o hallo
./hallo</code></pre>
    `,
    code: `#include <stdio.h>

int main(void) {
    printf("Hallo, Welt!\\n");
    return 0;
}`,
    output: 'Hallo, Welt!',
    quiz: {
      question: 'Welche Funktion gibt in C Text auf der Konsole aus?',
      options: ['print()', 'printf()', 'console.log()', 'echo()'],
      answer: 1
    }
  },

  {
    id: 'variablen-typen',
    section: 'Grundlagen',
    title: 'Variablen und Typen',
    body: `
      <p>Variablen sind Behälter für Daten. In C musst du immer angeben, welchen Typ
      eine Variable hat — das nennt man <strong>statische Typisierung</strong>.</p>

      <h3>Wichtige Basistypen</h3>
      <ul>
        <li><code>int</code> – Ganzzahl, typisch 4 Byte (z. B. <code>42</code>)</li>
        <li><code>float</code> – Gleitkommazahl mit einfacher Genauigkeit (z. B. <code>3.14f</code>)</li>
        <li><code>double</code> – Gleitkommazahl mit doppelter Genauigkeit</li>
        <li><code>char</code> – einzelnes Zeichen (z. B. <code>'A'</code>)</li>
      </ul>

      <h3>Format-Spezifizierer für printf</h3>
      <ul>
        <li><code>%d</code> – Ganzzahl</li>
        <li><code>%f</code> – Gleitkommazahl</li>
        <li><code>%c</code> – Zeichen</li>
        <li><code>%s</code> – Zeichenkette (String)</li>
      </ul>
    `,
    code: `#include <stdio.h>

int main(void) {
    int alter = 25;
    float groesse = 1.78f;
    char initial = 'L';

    printf("Alter:   %d Jahre\\n", alter);
    printf("Größe:   %.2f m\\n", groesse);
    printf("Initial: %c\\n", initial);
    return 0;
}`,
    output: `Alter:   25 Jahre
Größe:   1.78 m
Initial: L`,
    quiz: {
      question: 'Welcher Typ wird üblicherweise für ganze Zahlen verwendet?',
      options: ['float', 'char', 'int', 'string'],
      answer: 2
    }
  },

  {
    id: 'arrays',
    section: 'Grundlagen',
    title: 'Arrays',
    body: `
      <p>Ein <strong>Array</strong> ist eine feste Liste von Werten desselben Typs, die
      hintereinander im Speicher liegen. Der Zugriff erfolgt über einen Index, der bei <code>0</code> beginnt.</p>

      <h3>Deklaration</h3>
      <pre><code class="language-c">int zahlen[5] = {10, 20, 30, 40, 50};</code></pre>

      <h3>Wichtige Punkte</h3>
      <ul>
        <li>Die Länge ist <strong>fest</strong> und beim Anlegen bekannt.</li>
        <li>C prüft <strong>nicht</strong>, ob du einen gültigen Index nutzt — Vorsicht!</li>
        <li><code>sizeof(arr) / sizeof(arr[0])</code> liefert die Anzahl der Elemente.</li>
      </ul>
    `,
    code: `#include <stdio.h>

int main(void) {
    int zahlen[5] = {10, 20, 30, 40, 50};
    int summe = 0;

    for (int i = 0; i < 5; i++) {
        summe += zahlen[i];
    }
    printf("Summe: %d\\n", summe);
    printf("Erstes: %d, Letztes: %d\\n", zahlen[0], zahlen[4]);
    return 0;
}`,
    output: `Summe: 150
Erstes: 10, Letztes: 50`,
    quiz: {
      question: 'Bei welchem Index beginnt ein Array in C?',
      options: ['0', '1', '-1', 'beliebig'],
      answer: 0
    }
  },

  {
    id: 'strings',
    section: 'Grundlagen',
    title: 'Strings',
    body: `
      <p>Ein String in C ist <strong>kein eigener Typ</strong>, sondern ein Array von <code>char</code>,
      das mit dem speziellen Nullzeichen <code>'\\0'</code> endet.</p>

      <h3>Beispiel</h3>
      <pre><code class="language-c">char gruss[] = "Hallo";
// im Speicher: 'H','a','l','l','o','\\0'  (6 Bytes)</code></pre>

      <h3>String-Funktionen aus &lt;string.h&gt;</h3>
      <ul>
        <li><code>strlen(s)</code> – Länge ohne <code>'\\0'</code></li>
        <li><code>strcpy(ziel, quelle)</code> – kopieren</li>
        <li><code>strcat(a, b)</code> – aneinanderhängen</li>
        <li><code>strcmp(a, b)</code> – vergleichen (0 = gleich)</li>
      </ul>
    `,
    code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char vorname[20] = "Leon";
    char nachname[]  = "Müller";

    printf("Länge: %lu\\n", strlen(vorname));
    strcat(vorname, " ");
    strcat(vorname, nachname);
    printf("Voll:  %s\\n", vorname);
    return 0;
}`,
    output: `Länge: 4
Voll:  Leon Müller`,
    quiz: {
      question: 'Womit endet ein String in C im Speicher?',
      options: ['mit einem Leerzeichen', "mit '\\0'", 'mit \\n', 'gar nicht'],
      answer: 1
    }
  },

  {
    id: 'for-schleifen',
    section: 'Grundlagen',
    title: 'For-Schleifen',
    body: `
      <p>Eine <code>for</code>-Schleife wiederholt einen Block, solange eine Bedingung erfüllt ist.
      Sie hat drei Teile:</p>

      <pre><code class="language-c">for (initialisierung; bedingung; schritt) {
    // Schleifenkörper
}</code></pre>

      <ul>
        <li><strong>Initialisierung</strong>: Zähler vorbereiten (einmalig)</li>
        <li><strong>Bedingung</strong>: vor jedem Durchlauf geprüft</li>
        <li><strong>Schritt</strong>: nach jedem Durchlauf ausgeführt</li>
      </ul>

      <p>Die Schleife eignet sich besonders, wenn du genau weißt, wie oft etwas passieren soll.</p>
    `,
    code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("Durchlauf %d\\n", i);
    }
    return 0;
}`,
    output: `Durchlauf 1
Durchlauf 2
Durchlauf 3
Durchlauf 4
Durchlauf 5`,
    quiz: {
      question: 'Welcher Teil einer for-Schleife wird NUR EINMAL ausgeführt?',
      options: ['Bedingung', 'Schritt', 'Initialisierung', 'Schleifenkörper'],
      answer: 2
    }
  },

  {
    id: 'while-schleifen',
    section: 'Grundlagen',
    title: 'While-Schleifen',
    body: `
      <p>Die <code>while</code>-Schleife wiederholt einen Block, solange eine Bedingung
      <em>vor</em> dem Durchlauf wahr ist. Sie ist flexibler als <code>for</code>, wenn du
      die Anzahl der Wiederholungen nicht kennst.</p>

      <h3>Varianten</h3>
      <ul>
        <li><code>while (bed) { ... }</code> – Bedingung wird zuerst geprüft.</li>
        <li><code>do { ... } while (bed);</code> – Block läuft mindestens einmal.</li>
      </ul>

      <p>Vergiss nicht, die Bedingung im Schleifenkörper zu verändern — sonst endet sie nie!</p>
    `,
    code: `#include <stdio.h>

int main(void) {
    int n = 16;
    int schritte = 0;
    while (n > 1) {
        n /= 2;
        schritte++;
    }
    printf("Halbierungen bis 1: %d\\n", schritte);
    return 0;
}`,
    output: `Halbierungen bis 1: 4`,
    quiz: {
      question: 'Welche Schleife läuft mindestens EINMAL durch?',
      options: ['while', 'for', 'do-while', 'foreach'],
      answer: 2
    }
  },

  {
    id: 'funktionen',
    section: 'Grundlagen',
    title: 'Funktionen',
    body: `
      <p>Eine Funktion bündelt einen Codeabschnitt, dem du einen Namen gibst, sodass du ihn
      mehrfach aufrufen kannst. Eine Funktion hat:</p>

      <ul>
        <li>einen <strong>Rückgabetyp</strong> (z. B. <code>int</code>, <code>void</code> für „nichts")</li>
        <li>einen <strong>Namen</strong></li>
        <li>eine Liste von <strong>Parametern</strong></li>
        <li>einen <strong>Körper</strong> mit den Anweisungen</li>
      </ul>

      <h3>Funktionsdeklaration vs. Definition</h3>
      <p>Vor <code>main</code> kannst du den <em>Prototyp</em> deklarieren, damit der Compiler die
      Funktion bereits kennt — die eigentliche Definition kann darunter stehen.</p>
    `,
    code: `#include <stdio.h>

int addiere(int a, int b);  // Prototyp

int main(void) {
    int summe = addiere(7, 5);
    printf("7 + 5 = %d\\n", summe);
    return 0;
}

int addiere(int a, int b) {
    return a + b;
}`,
    output: `7 + 5 = 12`,
    quiz: {
      question: 'Was bedeutet ein Rückgabetyp von "void"?',
      options: ['Funktion gibt einen Pointer zurück', 'Funktion gibt nichts zurück', 'Funktion ist undefiniert', 'Funktion ist privat'],
      answer: 1
    }
  },

  // ============================ FORTGESCHRITTEN ============================
  {
    id: 'zeiger',
    section: 'Fortgeschritten',
    title: 'Zeiger (Pointer)',
    body: `
      <p>Ein <strong>Zeiger</strong> speichert keine gewöhnlichen Werte, sondern die <em>Adresse</em>
      einer anderen Variable im Speicher.</p>

      <h3>Operatoren</h3>
      <ul>
        <li><code>&amp;x</code> – Adresse von <code>x</code></li>
        <li><code>*p</code> – Wert, auf den <code>p</code> zeigt (Dereferenzieren)</li>
      </ul>

      <h3>Deklaration</h3>
      <pre><code class="language-c">int wert = 42;
int *p = &amp;wert;     // p zeigt auf wert
printf("%d\\n", *p);  // 42</code></pre>

      <p>Zeiger sind das Herzstück von C: dynamische Speicherverwaltung, Funktionsargumente per
      Referenz und Datenstrukturen wie verkettete Listen wären ohne sie nicht möglich.</p>
    `,
    code: `#include <stdio.h>

int main(void) {
    int wert = 42;
    int *p   = &wert;

    printf("Wert:   %d\\n", wert);
    printf("Über p: %d\\n", *p);
    *p = 100;
    printf("Neu:    %d\\n", wert);
    return 0;
}`,
    output: `Wert:   42
Über p: 42
Neu:    100`,
    quiz: {
      question: 'Was liefert der &-Operator?',
      options: ['den Wert einer Variablen', 'die Adresse einer Variablen', 'den Typ', 'einen Pointer auf NULL'],
      answer: 1
    }
  },

  {
    id: 'strukturen',
    section: 'Fortgeschritten',
    title: 'Strukturen (struct)',
    body: `
      <p>Mit <code>struct</code> kannst du mehrere Werte unterschiedlichen Typs zu einer Einheit
      zusammenfassen — vergleichbar mit einer Klasse ohne Methoden.</p>

      <h3>Deklaration und Nutzung</h3>
      <pre><code class="language-c">struct Punkt {
    int x;
    int y;
};

struct Punkt p = {3, 4};
p.x = 10;</code></pre>

      <p>Mit <code>typedef</code> kannst du dir das Schreiben von <code>struct</code> sparen:</p>
      <pre><code class="language-c">typedef struct { int x, y; } Punkt;
Punkt p = {3, 4};</code></pre>
    `,
    code: `#include <stdio.h>

typedef struct {
    char name[20];
    int  alter;
} Person;

int main(void) {
    Person p = {"Leon", 25};
    printf("%s ist %d Jahre alt.\\n", p.name, p.alter);
    p.alter++;
    printf("Geburtstag! Jetzt %d.\\n", p.alter);
    return 0;
}`,
    output: `Leon ist 25 Jahre alt.
Geburtstag! Jetzt 26.`,
    quiz: {
      question: 'Wie greifst du auf ein Feld einer struct-Variable zu?',
      options: ['p->feld', 'p.feld', 'p[feld]', 'p::feld'],
      answer: 1
    }
  },

  {
    id: 'referenzparameter',
    section: 'Fortgeschritten',
    title: 'Funktionsargument als Referenz',
    body: `
      <p>C übergibt Argumente standardmäßig <strong>per Wert</strong> — die Funktion bekommt
      eine Kopie. Willst du das Original ändern, übergibst du einen Zeiger.</p>

      <h3>Vergleich</h3>
      <pre><code class="language-c">void per_wert(int x)   { x = 99; }       // ändert nichts
void per_ref(int *x)   { *x = 99; }      // ändert das Original</code></pre>

      <p>So funktionieren auch Standardfunktionen wie <code>scanf("%d", &amp;n)</code> —
      die Adresse wird übergeben, damit die Funktion in <code>n</code> hineinschreiben kann.</p>
    `,
    code: `#include <stdio.h>

void tauschen(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 1, y = 9;
    tauschen(&x, &y);
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}`,
    output: `x = 9, y = 1`,
    quiz: {
      question: 'Wie wird in C "per Referenz" übergeben?',
      options: ['mit dem Schlüsselwort ref', 'durch Übergeben eines Zeigers', 'gar nicht möglich', 'mit & in der Signatur'],
      answer: 1
    }
  },

  {
    id: 'dynamische-allozierung',
    section: 'Fortgeschritten',
    title: 'Dynamische Allozierung',
    body: `
      <p>Mit <code>malloc</code>, <code>calloc</code>, <code>realloc</code> und <code>free</code>
      aus <code>&lt;stdlib.h&gt;</code> kannst du Speicher zur Laufzeit reservieren — etwa, wenn
      du die Größe erst beim Programmlauf kennst.</p>

      <h3>Wichtige Regeln</h3>
      <ul>
        <li>Jedes <code>malloc</code> braucht ein passendes <code>free</code> — sonst Memory-Leak.</li>
        <li>Prüfe immer, ob <code>malloc</code> nicht <code>NULL</code> zurückgegeben hat.</li>
        <li>Nach <code>free</code> ist der Zeiger ungültig — setze ihn auf <code>NULL</code>.</li>
      </ul>
    `,
    code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *arr = malloc(n * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < n; i++) arr[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    return 0;
}`,
    output: `0 1 4 9 16 `,
    quiz: {
      question: 'Womit gibst du dynamisch reservierten Speicher wieder frei?',
      options: ['delete', 'release()', 'free()', 'gc()'],
      answer: 2
    }
  },

  {
    id: 'rekursion',
    section: 'Fortgeschritten',
    title: 'Rekursion',
    body: `
      <p>Eine Funktion ist <strong>rekursiv</strong>, wenn sie sich selbst aufruft.
      Rekursion eignet sich besonders für Probleme, die in kleinere Teilprobleme zerfallen.</p>

      <h3>Zwei Bestandteile jeder Rekursion</h3>
      <ol>
        <li><strong>Basisfall</strong> — wann hört die Funktion auf?</li>
        <li><strong>Rekursiver Fall</strong> — wie verkleinert sich das Problem?</li>
      </ol>

      <p>Vorsicht vor unendlicher Rekursion (Stack Overflow!) — der Basisfall muss
      immer erreichbar sein.</p>
    `,
    code: `#include <stdio.h>

int fakultaet(int n) {
    if (n <= 1) return 1;        // Basisfall
    return n * fakultaet(n - 1); // rekursiv
}

int main(void) {
    for (int i = 0; i <= 6; i++)
        printf("%d! = %d\\n", i, fakultaet(i));
    return 0;
}`,
    output: `0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720`,
    quiz: {
      question: 'Was MUSS jede Rekursion haben, damit sie endet?',
      options: ['eine Schleife', 'einen Basisfall', 'einen globalen Zähler', 'eine if-Kette'],
      answer: 1
    }
  },

  {
    id: 'gelinkte-listen',
    section: 'Fortgeschritten',
    title: 'Gelinkte Listen',
    body: `
      <p>Eine <strong>verkettete Liste</strong> besteht aus Knoten, von denen jeder einen Wert
      und einen Zeiger auf den nächsten Knoten enthält. Im Gegensatz zum Array kannst du
      Elemente in O(1) am Anfang einfügen — dafür ist der wahlfreie Zugriff teurer.</p>

      <h3>Knoten-Struktur</h3>
      <pre><code class="language-c">typedef struct Node {
    int          wert;
    struct Node *next;
} Node;</code></pre>

      <p>Eine leere Liste ist einfach ein <code>Node *kopf = NULL;</code></p>
    `,
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int          wert;
    struct Node *next;
} Node;

Node *vorne_einfuegen(Node *kopf, int w) {
    Node *neu = malloc(sizeof(Node));
    neu->wert = w;
    neu->next = kopf;
    return neu;
}

int main(void) {
    Node *kopf = NULL;
    kopf = vorne_einfuegen(kopf, 3);
    kopf = vorne_einfuegen(kopf, 2);
    kopf = vorne_einfuegen(kopf, 1);

    for (Node *p = kopf; p; p = p->next)
        printf("%d -> ", p->wert);
    printf("NULL\\n");
    return 0;
}`,
    output: `1 -> 2 -> 3 -> NULL`,
    quiz: {
      question: 'Welchen Vorteil hat eine verkettete Liste gegenüber einem Array?',
      options: ['schneller wahlfreier Zugriff', 'weniger Speicher', 'einfügen am Anfang in O(1)', 'kürzerer Quelltext'],
      answer: 2
    }
  },

  {
    id: 'binaere-baeume',
    section: 'Fortgeschritten',
    title: 'Binäre Bäume',
    body: `
      <p>Ein <strong>Binärbaum</strong> ist eine Datenstruktur, in der jeder Knoten höchstens
      zwei Kinder hat: links und rechts. Häufig wird der Baum als <em>Suchbaum</em> verwendet —
      links sind kleinere, rechts größere Werte als der Knoten selbst.</p>

      <h3>Traversierungs-Reihenfolgen</h3>
      <ul>
        <li><strong>In-order</strong> – links, Knoten, rechts (sortiert bei BST)</li>
        <li><strong>Pre-order</strong> – Knoten, links, rechts</li>
        <li><strong>Post-order</strong> – links, rechts, Knoten</li>
      </ul>
    `,
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct N { int v; struct N *l, *r; } N;

N *einfuegen(N *t, int v) {
    if (!t) { N *n = malloc(sizeof(N)); n->v = v; n->l = n->r = NULL; return n; }
    if (v < t->v) t->l = einfuegen(t->l, v);
    else          t->r = einfuegen(t->r, v);
    return t;
}

void inorder(N *t) {
    if (!t) return;
    inorder(t->l);
    printf("%d ", t->v);
    inorder(t->r);
}

int main(void) {
    N *wurzel = NULL;
    int werte[] = {5, 3, 8, 1, 4, 7, 9};
    for (int i = 0; i < 7; i++) wurzel = einfuegen(wurzel, werte[i]);
    inorder(wurzel);
    printf("\\n");
    return 0;
}`,
    output: `1 3 4 5 7 8 9 `,
    quiz: {
      question: 'In welcher Reihenfolge liefert In-Order-Traversierung eines BST die Werte?',
      options: ['zufällig', 'aufsteigend sortiert', 'absteigend sortiert', 'in Einfügereihenfolge'],
      answer: 1
    }
  },

  {
    id: 'unions',
    section: 'Fortgeschritten',
    title: 'Unions',
    body: `
      <p>Eine <code>union</code> sieht aus wie eine <code>struct</code>, aber alle Felder teilen sich
      <strong>denselben Speicherbereich</strong>. Die Größe einer Union entspricht der Größe ihres
      größten Feldes.</p>

      <p>Unions sind nützlich, wenn ein Wert <em>entweder</em> A <em>oder</em> B sein kann — z. B. zur
      Bit-Interpretation oder für „getaggte Vereinigungen".</p>
    `,
    code: `#include <stdio.h>

typedef union {
    int   i;
    float f;
    char  bytes[4];
} Wandler;

int main(void) {
    Wandler w;
    w.f = 1.0f;
    printf("Float 1.0 als int (Bits): 0x%08X\\n", w.i);
    return 0;
}`,
    output: `Float 1.0 als int (Bits): 0x3F800000`,
    quiz: {
      question: 'Wie viel Speicher belegt eine union?',
      options: ['Summe aller Felder', 'Größe des größten Feldes', 'immer 4 Bytes', 'wie eine struct'],
      answer: 1
    }
  },

  {
    id: 'zeiger-arithmetik',
    section: 'Fortgeschritten',
    title: 'Zeiger-Arithmetik',
    body: `
      <p>Du kannst auf Zeiger <strong>rechnen</strong>: <code>p + 1</code> zeigt nicht ein Byte
      weiter, sondern <em>ein Element</em> seines Zieltyps weiter.</p>

      <h3>Folgen</h3>
      <ul>
        <li><code>arr[i]</code> ist äquivalent zu <code>*(arr + i)</code></li>
        <li>Bei <code>int *p</code> springt <code>p++</code> um <code>sizeof(int)</code> Bytes weiter.</li>
        <li>Differenzen <code>q - p</code> liefern eine Anzahl Elemente, keinen Byte-Wert.</li>
      </ul>
    `,
    code: `#include <stdio.h>

int main(void) {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;
    while (p < arr + 4) {
        printf("%d ", *p);
        p++;
    }
    printf("\\n");
    return 0;
}`,
    output: `10 20 30 40 `,
    quiz: {
      question: 'Wie viele Bytes weiter zeigt p+1, wenn p ein int*-Zeiger ist (4-Byte int)?',
      options: ['1 Byte', '2 Bytes', '4 Bytes', '8 Bytes'],
      answer: 2
    }
  },

  {
    id: 'funktionszeiger',
    section: 'Fortgeschritten',
    title: 'Funktionszeiger',
    body: `
      <p>Auch Funktionen leben im Speicher — und du kannst auf sie einen Zeiger speichern.
      So lassen sich Algorithmen <strong>parametrisieren</strong> (z. B. eigene Vergleichsfunktion
      für <code>qsort</code>) oder Callback-APIs bauen.</p>

      <h3>Syntax</h3>
      <pre><code class="language-c">int (*op)(int, int);   // Zeiger auf Funktion (int,int) -> int
op = addiere;
int s = op(3, 4);</code></pre>
    `,
    code: `#include <stdio.h>

int addiere(int a, int b) { return a + b; }
int multipl(int a, int b) { return a * b; }

void rechne(int (*op)(int,int), int a, int b) {
    printf("Ergebnis: %d\\n", op(a, b));
}

int main(void) {
    rechne(addiere, 3, 4);
    rechne(multipl, 3, 4);
    return 0;
}`,
    output: `Ergebnis: 7
Ergebnis: 12`,
    quiz: {
      question: 'Wofür sind Funktionszeiger besonders nützlich?',
      options: ['Variablen schneller machen', 'Callbacks und parametrisierbare Algorithmen', 'Kompilierzeit verkürzen', 'globale Zustände sparen'],
      answer: 1
    }
  },

  {
    id: 'bitmasks',
    section: 'Fortgeschritten',
    title: 'Bitmasks',
    body: `
      <p>Mit Bit-Operatoren (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>,
      <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) kannst du einzelne Bits in einer Zahl
      gezielt setzen, löschen oder umschalten — eine sehr platzsparende Methode für Flags.</p>

      <h3>Standard-Operationen</h3>
      <ul>
        <li><code>x | (1 &lt;&lt; n)</code> – Bit n setzen</li>
        <li><code>x &amp; ~(1 &lt;&lt; n)</code> – Bit n löschen</li>
        <li><code>x ^ (1 &lt;&lt; n)</code> – Bit n umschalten</li>
        <li><code>(x &gt;&gt; n) &amp; 1</code> – Bit n abfragen</li>
      </ul>
    `,
    code: `#include <stdio.h>

#define LESEN     (1 << 0)   // 0001
#define SCHREIBEN (1 << 1)   // 0010
#define LOESCHEN  (1 << 2)   // 0100

int main(void) {
    unsigned int rechte = 0;
    rechte |= LESEN;
    rechte |= SCHREIBEN;

    if (rechte & LESEN)     printf("Lesen erlaubt\\n");
    if (rechte & SCHREIBEN) printf("Schreiben erlaubt\\n");
    if (rechte & LOESCHEN)  printf("Löschen erlaubt\\n");
    else                    printf("Löschen NICHT erlaubt\\n");
    return 0;
}`,
    output: `Lesen erlaubt
Schreiben erlaubt
Löschen NICHT erlaubt`,
    quiz: {
      question: 'Wie setzt du Bit Nr. 3 in einer Variable x?',
      options: ['x | 3', 'x | (1 << 3)', 'x & (1 << 3)', 'x ^ 3'],
      answer: 1
    }
  },
];
