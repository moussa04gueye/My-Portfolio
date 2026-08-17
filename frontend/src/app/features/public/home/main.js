const texte = "Je suis Développeur";
        const element = document.getElementById("texte");

        let index = 0;

        function ecrireTexte() {
            // Affiche le texte jusqu'à l'index actuel
            element.textContent = texte.slice(0, index);

            index++;

            if (index <= texte.length) {
                // Continue à écrire
                setTimeout(ecrireTexte, 150); // vitesse d'écriture
            } else {
                // Pause avant de recommencer
                setTimeout(() => {
                    index = 0;
                    ecrireTexte();
                }, 1000); // pause avant redémarrage
            }
        }

        // Lancer l'effet
        ecrireTexte();