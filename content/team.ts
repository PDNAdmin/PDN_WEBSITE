/** Team (docs/09 `teamMember`), for /about. Real people and real photos only; the section hides until photos exist. */
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** /img/team/<first-last>.jpg (formal) and -candid.jpg (hover) */
  photo: string;
  photoCandid?: string;
  isFounder: boolean;
  order: number;
  linkedin?: string;
};

export const team: TeamMember[] = [];
