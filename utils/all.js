export function getYearProgress() {
    const now = new Date(); // Date actuelle
    const startOfYear = new Date(now.getFullYear(), 0, 1); // 1er janvier de l'année
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1); // 1er janvier de l'année suivante

    const elapsed = now - startOfYear; // Temps écoulé depuis le début de l'année en millisecondes
    const total = endOfYear - startOfYear; // Durée totale de l'année en millisecondes

    return (elapsed / total) * 100; // Pourcentage de l'année écoulée
}