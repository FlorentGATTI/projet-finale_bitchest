<!DOCTYPE html>
<html>
<head>
  <h1>Cahier des Charges - Projet BitChest</h1>
</head>
<body>

<h1>Objectif :</h1>
<p>Développer une plateforme en ligne permettant aux utilisateurs d'acheter et de vendre des crypto-monnaies.</p>

<h1>Contraintes Techniques :</h1>
<ul>
  <li>Front-end : Utilisation du framework React ou Vue.</li>
  <li>Back-end : Utilisation du framework Laravel.</li>
  <li>Utilisation d'API et services tiers autorisée.</li>
</ul>

<h1>Fonctionnalités :</h1>

<h2>Espace Administrateurs :</h2>
<ul>
  <li>Gestion des données personnelles des administrateurs.</li>
  <li>Gestion des clients (CRUD : Création, Affichage, Modification, Suppression).</li>
  <li>Attribution des droits d'utilisateur (administrateur ou client).</li>
  <li>Consultation des cours des crypto-monnaies.</li>
  <li>Affichage de la liste des crypto-monnaies et de leurs cours.</li>
</ul>

<h2>Espace Clients :</h2>
<ul>
  <li>Gestion des données personnelles des clients.</li>
  <li>Gestion du portefeuille (Affichage, Solde en euro, Vente de crypto-monnaies).</li>
  <li>Consultation des cours des crypto-monnaies.</li>
  <li>Affichage de la liste des crypto-monnaies et de leurs cours.</li>
  <li>Consultation de la courbe de progression de chaque crypto-monnaie.</li>
  <li>Achat de crypto-monnaies au cours actuel.</li>
</ul>

<h2>Portefeuille :</h2>
<ul>
  <li>Affichage des crypto-monnaies détenues par chaque client.</li>
  <li>Affichage des achats passés (date, quantité, cours).</li>
  <li>Calcul de la plus-value actuelle pour chaque crypto-monnaie.</li>
</ul>

<h2>Vente :</h2>
<ul>
  <li>Possibilité de vendre la totalité d'une crypto-monnaie pour récupérer sa valeur en euro.</li>
  <li>Impossible de vendre des quantités fractionnées.</li>
</ul>

<h2>Données Crypto-monnaies :</h2>
<ul>
  <li>Gestion de 10 crypto-monnaies : Bitcoin, Ethereum, Ripple, Bitcoin Cash, Cardano, Litecoin, NEM, Stellar, IOTA, Dash.</li>
  <li>Génération des cotations sur les 30 derniers jours via le script <code>cotation_generator.php</code>.</li>
  <li>Affichage de l'évolution sous forme graphique.</li>
</ul>

<h2>Interface d'Administration :</h2>
<ul>
  <li>Page de connexion commune pour administrateurs et clients.</li>
  <li>Structure d'administration avec colonne d'actions et zone de contenu.</li>
</ul>

<h1>Jury Final :</h1>
<p>Préparation d'une présentation de 15 minutes avec diapositives :</p>
<ol>
  <li>Introduction au projet, technologies utilisées.</li>
  <li>Conception (Structure des données, Zoning, Arborescence).</li>
  <li>Architecture (Controllers, Modules, Router).</li>
  <li>Parcours utilisateurs et fonctionnalités du site.</li>
  <li>Point de développement clé et résolution.</li>
  <li>Propositions d'améliorations et d'évolutions futures.</li>
</ol>

<h1>Livraisons :</h1>
<ul>
  <li>URL des dépôts GitHub/GitLab dans le dossier drive.</li>
  <li>Archive zippée contenant :</li>
  <ul>
    <li>Code source du site.</li>
    <li>PDF des diapositives de la présentation.</li>
    <li>URL du dépôt GitHub du projet.</li>
  </ul>
</ul>

</body>
</html>
