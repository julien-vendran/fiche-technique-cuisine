export class Cost {

    coutDesMatiere: number = 0;
    coutAssaisonnement: number = 0;
    coutDesCharges: number = 0;
    coutDesFluides: number = 0;
    coutDePersonnel: number = 0;
    coutDeProduction: number = 0;
    prixDeVente: number = 0;
    beneficeParPortion: number = 0;
    seuilDeRentabilite: number = 0;

    constructor (
        coutDesMatiere: number,
        coutDesFluides: number,
        coutDePersonnel: number,
        coutAssaisonnement: number | null,
    ) {
        this.coutDesMatiere = coutDesMatiere; 
        this.coutAssaisonnement = coutAssaisonnement ? coutAssaisonnement : coutDesMatiere * 0.05; //C'est soit un cout défini, soit 
        console.log("Assaisonnement : ", this.coutAssaisonnement);
        
        this.coutDesFluides = coutDesFluides; 
        this.coutDePersonnel = coutDePersonnel; 
        this.coutDesCharges = coutDesFluides + coutDePersonnel; 

        this.coutDeProduction = coutDesMatiere + this.coutDesCharges + this.coutAssaisonnement
        this.prixDeVente = this.coutDeProduction * 2; //on fixe un coef de 2 
    }
}