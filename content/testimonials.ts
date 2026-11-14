/**
 * Testimonials (docs/09 `testimonial`). Real clients only, wording approved by them, with a real photo
 * and written permission. Never a generated person.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** /img/clients/<slug>-person.jpg: a REAL photo of the person quoted */
  photo: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  projectSlug?: string;
  permissionConfirmed: boolean;
};

export const testimonials: Testimonial[] = [];

export const shownTestimonials = testimonials.filter((t) => t.permissionConfirmed && t.photo);
