/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CMSClient,
  CMSImage,
  Page,
  BlogPost,
  Event,
  TeamMember,
  Service,
  Testimonial,
  SiteSettings,
} from '../types';

// Import Contentful API functions (create lib/api/contentful.ts if it doesn't exist)
// import {
//   getPage,
//   getBlogPosts,
//   getBlogPost,
//   getEvents,
//   getTeamMembers,
//   getServices,
//   getTestimonials,
//   getSiteSettings,
// } from '@/lib/api/contentful';

// Transform functions to convert Contentful responses to shared types
// Using 'any' for Contentful entries since this is a stub adapter

function transformImage(asset: any): CMSImage | undefined {
  if (!asset?.fields) return undefined;

  const fields = asset.fields;
  return {
    url: fields.file?.url ? `https:${fields.file.url}` : '',
    alt: String(fields.title || fields.description || ''),
    width: fields.file?.details?.image?.width,
    height: fields.file?.details?.image?.height,
  };
}

function transformPage(entry: any): Page {
  const fields = entry.fields;

  return {
    slug: String(fields.slug || ''),
    title: String(fields.title || ''),
    seo: fields.seo ? {
      title: String(fields.seo.fields?.title || fields.title || ''),
      description: String(fields.seo.fields?.description || ''),
      ogImage: transformImage(fields.seo.fields?.ogImage),
    } : undefined,
    sections: Array.isArray(fields.sections) ? fields.sections : [],
  };
}

function transformBlogPost(entry: any): BlogPost {
  const fields = entry.fields;

  return {
    slug: String(fields.slug || ''),
    title: String(fields.title || ''),
    excerpt: String(fields.excerpt || ''),
    content: fields.content,
    featuredImage: transformImage(fields.featuredImage),
    publishedAt: new Date(String(fields.publishedAt || entry.sys.createdAt)),
    author: String(fields.author?.fields?.name || fields.author || ''),
    category: String(fields.category?.fields?.name || fields.category || ''),
    tags: Array.isArray(fields.tags)
      ? fields.tags.map((tag: any) => String(tag.fields?.name || tag))
      : [],
  };
}

function transformEvent(entry: any): Event {
  const fields = entry.fields;

  return {
    slug: String(fields.slug || ''),
    title: String(fields.title || ''),
    description: String(fields.description || ''),
    startDate: new Date(String(fields.startDate || new Date().toISOString())),
    endDate: fields.endDate ? new Date(String(fields.endDate)) : undefined,
    location: fields.location ? String(fields.location) : undefined,
    image: transformImage(fields.image),
    featured: Boolean(fields.featured),
    category: String(fields.category?.fields?.name || fields.category || ''),
  };
}

function transformTeamMember(entry: any): TeamMember {
  const fields = entry.fields;

  return {
    slug: String(fields.slug || ''),
    name: String(fields.name || ''),
    role: String(fields.role || ''),
    bio: fields.bio ? String(fields.bio) : undefined,
    image: transformImage(fields.image),
    department: String(fields.department?.fields?.name || fields.department || ''),
    order: typeof fields.order === 'number' ? fields.order : undefined,
  };
}

function transformService(entry: any): Service {
  const fields = entry.fields;

  return {
    slug: String(fields.slug || ''),
    title: String(fields.title || ''),
    description: String(fields.description || ''),
    icon: fields.icon ? String(fields.icon) : undefined,
    image: transformImage(fields.image),
    featured: Boolean(fields.featured),
  };
}

function transformTestimonial(entry: any): Testimonial {
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    quote: String(fields.quote || ''),
    author: String(fields.author || ''),
    role: fields.role ? String(fields.role) : undefined,
    company: fields.company ? String(fields.company) : undefined,
    image: transformImage(fields.image),
    featured: Boolean(fields.featured),
  };
}

function transformSiteSettings(entry: any): SiteSettings {
  const fields = entry.fields;
  const socialLinks = fields.socialLinks;
  const contactInfo = fields.contactInfo;

  return {
    siteName: String(fields.siteName || ''),
    tagline: fields.tagline ? String(fields.tagline) : undefined,
    logo: transformImage(fields.logo),
    socialLinks: {
      facebook: String(socialLinks?.facebook || fields.facebook || ''),
      twitter: String(socialLinks?.twitter || fields.twitter || ''),
      instagram: String(socialLinks?.instagram || fields.instagram || ''),
      youtube: String(socialLinks?.youtube || fields.youtube || ''),
      linkedin: String(socialLinks?.linkedin || fields.linkedin || ''),
    },
    contactInfo: {
      email: String(contactInfo?.email || fields.email || ''),
      phone: String(contactInfo?.phone || fields.phone || ''),
      address: String(contactInfo?.address || fields.address || ''),
    },
  };
}

// Mark transform functions as used (they're ready for when the adapter is fully implemented)
void transformPage;
void transformBlogPost;
void transformEvent;
void transformTeamMember;
void transformService;
void transformTestimonial;
void transformSiteSettings;

// Contentful adapter implementing CMSClient interface
export const contentfulAdapter: CMSClient = {
  async getPage(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // const page = await getPage(slug);
    // return page ? transformPage(page) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getPage not implemented yet');
    return null;
  },
  
  async getBlogPosts(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const posts = await getBlogPosts(
    //   options?.limit,
    //   options?.category,
    //   options?.tag,
    //   options?.excludeSlug
    // );
    // return posts.map(transformBlogPost);
    
    // Temporary stub
    console.warn('Contentful adapter: getBlogPosts not implemented yet');
    return [];
  },
  
  async getBlogPost(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // const post = await getBlogPost(slug);
    // return post ? transformBlogPost(post) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getBlogPost not implemented yet');
    return null;
  },
  
  async getEvents(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const events = await getEvents(
    //   options?.limit,
    //   options?.featured,
    //   options?.category,
    //   options?.upcoming
    // );
    // return events.map(transformEvent);
    
    // Temporary stub
    console.warn('Contentful adapter: getEvents not implemented yet');
    return [];
  },
  
  async getEvent(slug) {
    // Uncomment when lib/api/contentful.ts is created
    // If there's no getEvent in contentful.ts, filter from getEvents
    // const events = await getEvents();
    // const event = events.find(e => e.fields?.slug === slug);
    // return event ? transformEvent(event) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getEvent not implemented yet');
    return null;
  },
  
  async getTeamMembers(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const members = await getTeamMembers(options?.limit, options?.department);
    // return members.map(transformTeamMember);
    
    // Temporary stub
    console.warn('Contentful adapter: getTeamMembers not implemented yet');
    return [];
  },
  
  async getServices(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const services = await getServices(options?.limit, options?.featured);
    // return services.map(transformService);
    
    // Temporary stub
    console.warn('Contentful adapter: getServices not implemented yet');
    return [];
  },
  
  async getTestimonials(options) {
    // Uncomment when lib/api/contentful.ts is created
    // const testimonials = await getTestimonials(options?.limit, options?.featured);
    // return testimonials.map(transformTestimonial);
    
    // Temporary stub
    console.warn('Contentful adapter: getTestimonials not implemented yet');
    return [];
  },
  
  async getSiteSettings() {
    // Uncomment when lib/api/contentful.ts is created
    // const settings = await getSiteSettings();
    // return settings ? transformSiteSettings(settings) : null;
    
    // Temporary stub
    console.warn('Contentful adapter: getSiteSettings not implemented yet');
    return null;
  },
};
