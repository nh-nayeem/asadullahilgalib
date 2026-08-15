"use client";

import { motion } from 'framer-motion';
import { FaAward, FaBriefcase, FaCamera, FaCertificate, FaComments, FaEdit, FaFilm, FaGraduationCap, FaImage, FaLightbulb, FaPalette, FaProjectDiagram, FaUsers, FaVideo } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import SocialLinks from '@/app/components/common/SocialLinks';
import profileData from '../../../public/content/profile.json';
import type { ProfileContent, ProfileEntry } from '@/lib/profile-types';

const profile = profileData as ProfileContent;

const skillIcons: Record<string, IconType> = {
  film: FaFilm,
  camera: FaCamera,
  edit: FaEdit,
  lightbulb: FaLightbulb,
  video: FaVideo,
  palette: FaPalette,
  image: FaImage,
  users: FaUsers,
  project: FaProjectDiagram,
  comments: FaComments,
};

const SectionHeading = ({ title, icon: Icon }: { title: string; icon: typeof FaAward }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
    <Icon className="text-4xl text-white mx-auto mb-4" />
    <h2 className="text-3xl font-bold text-white">{title}</h2>
  </motion.div>
);

const Card = ({ entry, background = 'bg-gray-900' }: { entry: ProfileEntry; background?: 'bg-gray-800' | 'bg-gray-900' }) => (
  <motion.article initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`${background} p-6 rounded-lg border border-gray-700 hover:border-amber-400 transition-colors flex items-start gap-4`}>
    {entry.image ? <img src={entry.image} alt="" className="w-16 h-16 object-contain rounded-lg flex-shrink-0" /> : null}
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">{entry.title}</h3>
      {entry.subtitle && <p className="text-gray-400 mb-2">{entry.subtitle}</p>}
      {entry.period && <p className="text-gray-500 text-sm mb-2">{entry.period}</p>}
      {entry.description && <p className="text-gray-300 text-sm">{entry.description}</p>}
    </div>
  </motion.article>
);

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section id="about" className="relative py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative max-w-sm mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-700"><img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" /></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-amber-400" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-amber-400" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">{profile.aboutTitle}</h1>
              <p className="text-gray-300 leading-relaxed text-justify whitespace-pre-line mb-8">{profile.biography}</p>
              <SocialLinks links={profile.socialLinks} hoverColor="text-amber-400" />
            </motion.div>
          </div>
        </section>

        <section id="education" className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto"><SectionHeading title="Education" icon={FaGraduationCap} /><div className="grid md:grid-cols-2 gap-6">{profile.education.map((entry, index) => <Card key={index} entry={entry} />)}</div></div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto"><SectionHeading title="Skills" icon={FaLightbulb} /><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">{profile.skills.map((entry, index) => {
            const SkillIcon = skillIcons[entry.icon || ''] || FaLightbulb;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-amber-400 h-32 flex flex-col items-center justify-center text-center">
                <SkillIcon className="text-4xl text-amber-400 mb-3" /><h3 className="text-white font-medium text-sm">{entry.title}</h3>
              </motion.div>
            );
          })}</div></div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto"><SectionHeading title="Experiences" icon={FaBriefcase} /><div className="grid md:grid-cols-2 gap-6">{profile.experiences.map((entry, index) => <Card key={index} entry={entry} />)}</div></div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto"><SectionHeading title="Certifications" icon={FaCertificate} /><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{profile.certifications.map((entry, index) => <Card key={index} entry={entry} background="bg-gray-800" />)}</div></div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto"><SectionHeading title="Awards & Recognition" icon={FaAward} /><div className="space-y-6">{profile.awards.map((entry, index) => (
            <motion.article key={index} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-amber-400 flex items-center gap-6">
              <div className="text-4xl">{entry.icon || '⭐'}</div><div><h3 className="text-xl font-semibold text-white mb-1">{entry.title}</h3>{entry.subtitle && <p className="text-gray-400 mb-2">{entry.subtitle}</p>}{entry.description && <p className="text-gray-300 text-sm">{entry.description}</p>}</div>
            </motion.article>
          ))}</div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
