export interface Program {
  id: number;
  image: string;
  heading: string;
  summary: string;
  details: string;
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image?: string;
}

export interface Testimonial {
  image: string;
  name: string;
  position: string;
  feedback: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  thumb: string;
  caption: string;
  category: string;
  width: number;
  height: number;
}
