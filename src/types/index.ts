// authentification
export interface User {
  id: number;
  nom: string;
  email: string;
}

export interface AuthUser {
  token: string;
  user: User;
}

// Dvds Types
export interface Dvd {
  id: number | null;
  user_id: number | null;
  titre: string;
  titre_original?: string | null;
  realisateur?: string | null;
  annee?: number | null;
  duree?: number | null;
  genre?: string | null;
  nationalite?: string | null;
  acteurs?: string | null;
  synopsis?: string | null;
  image_url?: string | null;
  emplacement?: string | null;
  statut: "en collection" | "prêté" | "perdu";
  prete_a?: string | null;
  date_pret?: string | null;
  notes_perso?: string | null;
  date_ajout: string;
  date_modification: string | null;
}

// types for api responses
export interface DvdListResponse {
  dvds: Dvd[];
  total: number;
  page: number;
  totalPages: number;
}
