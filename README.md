# ☕ coffemachine

Une simulation Java simple d'une machine à café automatique.

---

## Fonctionnalités

- Accepte le paiement de l'utilisateur (`pay`)
- Affiche les choix de café disponibles (`choice`)
- Prépare et sert le café (`getcoffee`)
- Gère les erreurs : paiement insuffisant, rupture de stock, mauvaise sélection, panne, maintenance

---

##  Cas d'utilisation

| Étape | Action                        |
|-------|-------------------------------|
| c1    | `pay(amount)` – Insertion d'argent |
| c2    | `choice café` – Menu de cafés disponibles |
| c3    | → Espresso                    |
| c4    | → Latte                       |
| c5    | → Cappuccino                  |
| c6    | `getcoffee` – Préparation et distribution du café |

---

##  Gestion des erreurs

| Code | Erreur                  | Description                                                                 |
|------|-------------------------|-----------------------------------------------------------------------------|
| e1   | Paiement insuffisant    | L'argent inséré est inférieur au prix du café.                             |
| e2   | Café indisponible       | Le stock de ce type de café est épuisé.                                    |
| e3   | Mauvaise sélection      | Le café sélectionné ne fait pas partie du menu.                            |
| e4   | Machine hors service    | Panne d’électricité ou maintenance en cours.                               |
| e5   | Aucun café sélectionné  | Aucun choix effectué avant la commande.                                    |

---

##  Modélisation

### `CoffeeMachine`

**Attributs :**
- `balance: double` — Montant inséré par l'utilisateur
- `menu: List<Coffee>` — Liste des cafés disponibles
- `selectedCoffee: Coffee` — Café actuellement sélectionné
- `poweredOn: boolean` — Indique si la machine est sous tension

**Méthodes :**
- `pay(amount: double): void` — Ajoute le montant à la balance
- `choose(type: String): void` — Sélectionne un café depuis le menu
- `getCoffee(): Coffee` — Prépare et retourne le café sélectionné
- `cancel(): double` — Annule la commande et rend l’argent inséré
- `giveChange(): double` — Récupère la monnaie après achat

---

### `Coffee`

**Attributs :**
- `type: String` — Nom du café
- `price: double` — Prix du café
- `quantity: int` — Quantité disponible pour ce café

**Méthode :**
- `prepare(): void` — Prépare le café sélectionné

---

###  Description des classes

- **`CoffeeMachine`** : Gère le paiement, la sélection du café, la distribution et les erreurs possibles.
- **`Coffee`** : Représente une boisson avec son nom, son prix, sa quantité disponible, et sa méthode de préparation.

---

##  Tests à prévoir

- Paiement exact → Livraison du café
- Paiement supérieur → Livraison + rendu de monnaie
- Paiement insuffisant → Erreur `e1`
- Café en rupture → Erreur `e2`
- Sélection invalide → Erreur `e3`
- Machine hors service → Erreur `e4`
- Aucun choix → Erreur `e5`
- Annulation → Retour du montant inséré

---



