const texte = "";
        const element = document.getElementById("texte");

        let index = 0;

        function ecrireTexte() {
            element.textContent = texte.slice(0, index);

            index++;

            if (index <= texte.length) {
                setTimeout(ecrireTexte, 150); // vitesse d'écriture
            } else {
                setTimeout(() => {
                    index = 0;
                    ecrireTexte();
                }, 1000); 
            }
        }

        ecrireTexte();