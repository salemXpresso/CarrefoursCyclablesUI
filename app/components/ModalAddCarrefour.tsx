"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ModalForm({ onSubmit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        explicitpriority: 0,
        clear: 0,
        covis: 0,
        protected: 0,
        continuity: 0,
        short: 0,
        obstacle: 0,
        rightturn: 0,
        priority: 0,
        identifiable: 0,
        standardize: 0,
        quality: 0,
        good: 0,
        noborders: 0,
        pollution: 0,
        water: 0,
        wind: 0,
        heat: 0,
        green: 0,
        large: 0,
        nice: 0,
        security: 0
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showErrorToast = (message: string) => {
        toast.error(message, {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const nextStep = () => {
        // Vérifier si les champs obligatoires sont remplis
        if (step === 1) {
            if (!formData.name) {
                showErrorToast("Le nom de l'intersection est obligatoire.");
                return;
            }
            if (!formData.date) {
                showErrorToast("La date est obligatoire.");
                return;
            }
        }
        setStep((prev) => prev + 1);
    };
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulaire soumis :", formData);
        onSubmit(formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Ajouter un carrefour</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md h-screen overflow-y-auto border">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                    <div>
                        <DialogHeader>
                            <DialogTitle>Ajout d'un carrefour</DialogTitle>
                        </DialogHeader>
                        <div>
                            <Label htmlFor="name">Nom de l'intersection</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="date">Date de l'évaluation</Label>
                            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>
                        <Button type="button" className="w-full mt-4" onClick={nextStep}>
                            Suivant
                        </Button>
                    </div>
                    )}
                    {step === 2 && (
                    <div>
                        <DialogHeader>
                            <DialogTitle>Sécurité</DialogTitle>
                        </DialogHeader>
                        <div>
                            <Label htmlFor="name">Le régime de priorité est clairement identifiable</Label>
                            <Input id="explicitpriority" type="number" step="any"  min="0" max="5" name="explicitpriority" value={formData.explicitpriority} onChange={handleChange} required />
                            <span class="field-description">Signalisation très explicite : 5 points<br />Signalisation partiellement explicite : 2,5 points<br />Signalisation pas du tout explicite : 0 point
                            </span>
                        </div>
                        <div>
                            <Label htmlFor="name">L'intersection est dégagée</Label>
                            <Input id="clear" type="number" step="any"  min="0" max="5" name="clear" value={formData.clear} onChange={handleChange} required />
                            <span class="field-description">L'intersection est complètement dégagée : 5 points<br />L'intersection dispose d'éléments masquant la visibilité : 2,5 points<br />L'intersection manque clairement de visibilité : 0 point
                            </span>
                        </div>
                        <div>
                            <Label htmlFor="name">La covisibilité est bien présente et suffisante</Label>
                            <Input id="covis" type="number" step="any"  min="0" max="10" name="covis" value={formData.covis} onChange={handleChange} required />
                            <span class="field-description">L'aménagement permet une covisibilité des usagers : 10 points<br />Covisibilité partielle ou sas vélo présents : 5 points<br />Il y a une absence de covisibilité (angles morts) : 0 point
                            </span>
                        </div>
                        <div>
                            <Label htmlFor="name">Les cyclistes sont protégés des autres usagers de la voirie</Label>
                            <Input id="protected" type="number" step="any"  min="0" max="10" name="protected" value={formData.protected} onChange={handleChange} required />
                            <span class="field-description">Aménagement entièrement séparé de la circulation générale : 10 points<br />Aménagement séparé de la circulation générale sur les 3/4 de carrefour : 7.5 points<br />Aménagement séparé de la circulation générale sur la moitié du carrefour : 5 points<br />Aménagement séparé de la circulation générale sur le 1/4 du carrefour : 2.5 points<br />Aménagement non séparé de la circulation générale : 0 points
                            </span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button type="button" variant="outline" onClick={prevStep}>
                                Retour
                            </Button>
                            <Button type="button" onClick={nextStep}>
                                Suivant
                            </Button>
                        </div>
                    </div>
                    )}
                    {step === 3 && (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Caractère direct</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">L'aménagement permet une continuité de la trajectoire, sans pied à terre pour les cyclistes</Label>
                                <Input id="continuity" type="number" step="any"  min="0" max="10" name="continuity" value={formData.continuity} onChange={handleChange} required />
                                <span class="field-description">L'intersection est raccordée au réseau cyclable (5 points) et le cheminement est marqué du début à la fin de l'intersection (5 points).<br />Partiellement : 2.5 points par critère - Pas du tout : 0 point par critère.
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">La trajectoire de traversée est directe / courte</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="2.5" name="short" value={formData.short} onChange={handleChange} required />
                                <span class="field-description">Giratoire : - empruntable dans les deux sens : 2.5 points - à sens unique : 0 point<br />Carrefour à feux : - les trajectoires sont directes et sans détours : 2,5 points - certaines trajectoires (tourne à gauche, tout droit) sur une partie des branches du carrefour impliquent un détour ou d'effectuer la traversée en deux fois : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Aucun obstacle n'est présent</Label>
                                <Input id="covis" type="number" step="any"  min="0" max="2.5" name="obstacle" value={formData.obstacle} onChange={handleChange} required />
                                <span class="field-description">Pas d'obstacle : 2.5 points<br />Un obstacle (potelet, poteau, obstacle de chantier) est présent sur la trajectoire : 0 point
                                </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Carrefour à feux : présence d'un tourne à droite</Label>
                                <Input id="covis" type="number" step="any"  min="0" max="2.5" name="rightturn" value={formData.rightturn} onChange={handleChange} required />
                                <span className="field-description">Les cyclistes disposent d'un espace protégé pour se positionner s'ils souhaitent tourner à gauche : 5 points<br />Les cyclistes ne disposent d'aucun espace pour se positionner s'ils souhaitent tourner à gauche : 0 point
                                </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Giratoire : les cyclistes sont prioritaires sur les usagers motorisés</Label>
                                <Input id="covis" type="number" step="any"  min="0" max="2.5" name="priority" value={formData.priority} onChange={handleChange} required />
                                <span className="field-description">Le giratoire dispose d'aménagements permettant de faire ralentir les automobilistes sur toutes les branches de l'anneau : 5 points<br />Le giratoire dispose d'aménagements permettant de faire ralentir les automobilistes sur une partie des branches de l'anneau ou le giratoire est monté sur un plateau : 2.5 points<br />Le giratoire ne dispose d'aucun aménagement permettant de faire ralentir les automobilistes : 0 point
                                </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    Retour
                                </Button>
                                <Button type="button" onClick={nextStep}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Cohérence</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">Les aménagements cyclables sont reconnaissables</Label>
                                <Input id="continuity" type="number" step="any"  min="0" max="5" name="identifiable" value={formData.identifiable} onChange={handleChange} required />
                                <span class="field-description">Un aménagement reconnaissable peut se distinguer de la chaussée et du trottoir selon plusieurs critères : 1. différence de niveau, 2. différence de couleur ou de matériaux, 3. l'itinéraire est jalonné (plots, pictogrammes blancs, chevrons).<br />Si au moins 2 de ces trois critères sont respectés sur l'ensemble de l'intersection = 5 points<br />Si au moins 2 de ces trois critères sont respectés sur une partie de l'intersection = 2.5 points<br />Sinon 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">L'intersection est uniformisée</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="5" name="standardize" value={formData.standardize} onChange={handleChange} required />
                                <span class="field-description">Toutes les branches sont traitées de manière similaires (quel que soit l’aménagement) : 5 points<br />Une seule branche n’est pas traitée de la même manière : 2.5 points<br />Au moins deux branches ne sont pas traitées de la même manière : 0 point
                            </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    Retour
                                </Button>
                                <Button type="button" onClick={nextStep}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Confort</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">Le revêtement est de bonne qualité</Label>
                                <Input id="continuity" type="number" step="any"  min="0" max="1" name="quality" value={formData.quality} onChange={handleChange} required />
                                <span class="field-description">Qualité du type de revêtement choisi (indépendamment de son état qui est traité ci-dessous). <br />Revêtement en béton ou enrobé qui permet un roulement sans secousse : 1 point<br />Revêtement pavé ou revêtement gondolé : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Le revêtement est en bon état</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="good" value={formData.good} onChange={handleChange} required />
                                <span class="field-description">Le revêtement ne comporte pas de trous, bosses, fissures ou éléments extérieurs : 1 point Le revêtement est en mauvais état (bosses, trous, fissures, gravillons) : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Les bordures sont abaissées</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="3" name="noborders" value={formData.noborders} onChange={handleChange} required />
                                <span className="field-description">Les effets d'une bordure non ou mal abaissée peuvent aller du simple soubresaut au risque de chute par temps humide ou en cas de mauvaise visibilité. L'ensemble des bordures sont abaissées : 3 points<br />Une partie des bordures sont abaissées : 1.5 points<br />Aucune bordure n'est abaissée ou très peu : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Pollution visuelle</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="pollution" value={formData.pollution} onChange={handleChange} required />
                                <span className="field-description">Aucune présence d’élément pouvant nuire aux cyclistes dans leur champs de vision (ou minorer leur visibilité pour les automobilistes) : publicité, lumière trop importante… : 1 point<br />Présence d'une publicité ou d'autre pollution visuelle : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Revêtement limitant l'apparition de flaques d'eau et-ou verglas</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="water" value={formData.water} onChange={handleChange} required />
                                <span className="field-description">Points d'attention sur les pentes permettant à l'eau de s'écouler ou à l'inverse les crevasses et les trous accumulant les flaques<br />Revêtement OK : 1 point<br />Revêtement problématique : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">Aménagement limitant la prise au vent</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="wind" value={formData.wind} onChange={handleChange} required />
                                <span className="field-description">La présence de végétalisation et de bâti à proximité permet de casser la prise au vent.<br />Végétalisation ou bâti à proximité de l'intersection : 1 point<br />Pas de végétalisation et bâti éloigné : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">L'exposition aux ilots de chaleur urbains est limitée</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="heat" value={formData.heat} onChange={handleChange} required />
                                <span className="field-description">Absence de continuité minérales urbaine à proximité immédiate. <br />Intersection dégagée, loin de bâti et source de chaleur urbaine : 1 point<br />Bâti et source de chaleur urbaine proche : 0 point
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">L'intersection et son environnement sont suffisamment végétalisés</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="green" value={formData.green} onChange={handleChange} required />
                                <span className="field-description">Présence suffisante d'arbres, de plantes, de zones enherbées : 1 point<br />Environnement minéral : 0 point
                            </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    Retour
                                </Button>
                                <Button type="button" onClick={nextStep}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 6 && (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Attractivité</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Label htmlFor="name">L'aménagement et les trajectoires sont suffisamment larges</Label>
                                <Input id="continuity" type="number" step="any"  min="0" max="8" name="large" value={formData.large} onChange={handleChange} required />
                                <span class="field-description">A pondérer en fonction du nombre de branches<br />100% des points : unidirectionnelle 2,5m / bidirectionnelle 4m<br />50% des points : unidirectionnelle entre 2,5 et 1,6m / bidirectionnelle entre 4 et 2,5m<br />0% des points : unidirectionnelle moins d’1,6m / bidirectionnelle moins de 2,5m
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">L'intersection est plaisante</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="nice" value={formData.nice} onChange={handleChange} required />
                                <span class="field-description">Les piétons et cyclistes sont nombreux à utiliser l’intersection comparativement aux usagers motorisés, présence de lieux de vie ou d'un cadre agréable : 1 point<br />Intersection bruyante, peu vivante ou dans un cadre peu attrayant : 0 point.
                            </span>
                            </div>
                            <div>
                                <Label htmlFor="name">L'intersection confère un sentiment de sécurité</Label>
                                <Input id="clear" type="number" step="any"  min="0" max="1" name="security" value={formData.security} onChange={handleChange} required />
                                <span className="field-description">Vitesse limitée des usagers motorisés et présence d'éclairage urbain : 1 point<br />Vitesse et/ou volume excessif d'usagers motorisés ou pas d'éclairage urbain : 0 point
                            </span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    Retour
                                </Button>
                                <Button type="submit">Valider</Button>
                            </div>
                        </div>
                    )}
                </form>
                <ToastContainer />
            </DialogContent>
        </Dialog>
    );
}
