"use client";

import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { FaCamera, FaComments, FaEdit, FaFilm, FaImage, FaLightbulb, FaPalette, FaProjectDiagram, FaUsers, FaVideo } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { ProfileContent, ProfileEntry } from '@/lib/profile-types';

const emptyProfile: ProfileContent = {
  name: '', tagline: '', aboutTitle: '', biography: '', profileImage: '', heroImage: '',
  socialLinks: { facebook: '', youtube: '', instagram: '', linkedin: '' },
  education: [], skills: [], experiences: [], certifications: [], awards: [],
};

const groups: Array<{ key: keyof Pick<ProfileContent, 'education' | 'skills' | 'experiences' | 'certifications' | 'awards'>; label: string }> = [
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'experiences', label: 'Experiences' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'awards', label: 'Awards & Recognition' },
];

const singularLabels: Record<typeof groups[number]['key'], string> = {
  education: 'education entry',
  skills: 'skill',
  experiences: 'experience',
  certifications: 'certification',
  awards: 'award',
};

const groupDescriptions: Record<typeof groups[number]['key'], string> = {
  education: 'Degrees, courses, and academic institutions shown in the Education section.',
  skills: 'Professional skills displayed as cards on the About page.',
  experiences: 'Roles, organizations, and professional experience.',
  certifications: 'Courses, workshops, programs, and certificates.',
  awards: 'Awards, festival selections, nominations, and recognition.',
};

const titleLabels: Record<typeof groups[number]['key'], string> = {
  education: 'Degree or course', skills: 'Skill name', experiences: 'Role or experience',
  certifications: 'Certification name', awards: 'Award or recognition',
};

const fieldClass = 'w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400';

const skillIconOptions: Array<{ value: string; label: string; Icon: IconType }> = [
  { value: 'film', label: 'Film', Icon: FaFilm },
  { value: 'camera', label: 'Camera', Icon: FaCamera },
  { value: 'edit', label: 'Writing', Icon: FaEdit },
  { value: 'lightbulb', label: 'Ideas', Icon: FaLightbulb },
  { value: 'video', label: 'Video', Icon: FaVideo },
  { value: 'palette', label: 'Design', Icon: FaPalette },
  { value: 'image', label: 'Photo', Icon: FaImage },
  { value: 'users', label: 'People', Icon: FaUsers },
  { value: 'project', label: 'Projects', Icon: FaProjectDiagram },
  { value: 'comments', label: 'Communication', Icon: FaComments },
];

export default function ProfileManager() {
  const [profile, setProfile] = useState<ProfileContent>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [openSkillIconIndex, setOpenSkillIconIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?section=profile')
      .then(async response => {
        if (!response.ok) throw new Error('Could not load profile');
        return response.json();
      })
      .then(data => setProfile({ ...emptyProfile, ...data.content, socialLinks: { ...emptyProfile.socialLinks, ...data.content?.socialLinks } }))
      .catch(error => setMessage(error instanceof Error ? error.message : 'Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const updateEntry = (group: typeof groups[number]['key'], index: number, field: keyof ProfileEntry, value: string) => {
    const entries = [...profile[group]];
    entries[index] = { ...entries[index], [field]: value };
    setProfile({ ...profile, [group]: entries });
  };

  const moveEntry = (group: typeof groups[number]['key'], index: number, offset: number) => {
    const target = index + offset;
    if (target < 0 || target >= profile[group].length) return;
    const entries = [...profile[group]];
    [entries[index], entries[target]] = [entries[target], entries[index]];
    setProfile({ ...profile, [group]: entries });
  };

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'profile', content: profile }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Could not save profile');
      setMessage('About page saved successfully. The deployed site will update after the GitHub deployment finishes.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save the About page');
    } finally { setSaving(false); }
  };

  if (loading) return <p className="text-gray-600">Loading profile…</p>;

  return (
    <div className="space-y-6">
      <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">About introduction</h3>
        <p className="text-sm text-gray-500">Change the heading, introductory text, and portrait shown at the top of the About page.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {(['aboutTitle', 'profileImage'] as const).map(field => (
            <label key={field} className="text-sm text-gray-700">
              <span className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
              <input className={fieldClass} value={profile[field]} onChange={e => setProfile({ ...profile, [field]: e.target.value })} />
            </label>
          ))}
        </div>
        <label className="block text-sm text-gray-700">
          <span className="block mb-1">Biography</span>
          <textarea rows={7} className={fieldClass} value={profile.biography} onChange={e => setProfile({ ...profile, biography: e.target.value })} />
        </label>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Social links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(Object.keys(profile.socialLinks) as Array<keyof ProfileContent['socialLinks']>).map(network => (
            <label key={network} className="text-sm text-gray-700">
              <span className="block mb-1 capitalize">{network}</span>
              <input type="url" className={fieldClass} value={profile.socialLinks[network]} onChange={e => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, [network]: e.target.value } })} />
            </label>
          ))}
        </div>
      </section>

      {groups.map(group => (
        <section key={group.key} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">{group.label}</h3>
                <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700">{profile[group.key].length} {profile[group.key].length === 1 ? 'item' : 'items'}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{groupDescriptions[group.key]}</p>
            </div>
            <button
              onClick={() => setProfile({ ...profile, [group.key]: [...profile[group.key], { title: '' }] })}
              className="flex shrink-0 items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700"
            >
              <FiPlus /> Add {singularLabels[group.key]}
            </button>
          </div>
          <div className="p-6 space-y-5">
            {profile[group.key].length === 0 && (
              <div className="rounded-lg border-2 border-dashed border-gray-200 px-6 py-10 text-center">
                <p className="font-medium text-gray-700">No {group.label.toLowerCase()} added yet</p>
                <p className="mt-1 text-sm text-gray-500">Use “Add {singularLabels[group.key]}” to create the first item.</p>
              </div>
            )}
            {profile[group.key].map((entry, index) => (
              <article key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <header className="flex items-center justify-between gap-4 bg-gray-50 border-b border-gray-200 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{singularLabels[group.key]} {index + 1}</p>
                    <h4 className="truncate font-medium text-gray-900">{entry.title || `Untitled ${singularLabels[group.key]}`}</h4>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button title="Move earlier" aria-label={`Move ${singularLabels[group.key]} earlier`} onClick={() => moveEntry(group.key, index, -1)} disabled={index === 0} className="flex items-center gap-1 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"><FiChevronUp /> <span className="hidden lg:inline">Earlier</span></button>
                    <button title="Move later" aria-label={`Move ${singularLabels[group.key]} later`} onClick={() => moveEntry(group.key, index, 1)} disabled={index === profile[group.key].length - 1} className="flex items-center gap-1 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"><FiChevronDown /> <span className="hidden lg:inline">Later</span></button>
                    <button aria-label={`Delete ${singularLabels[group.key]}`} onClick={() => setProfile({ ...profile, [group.key]: profile[group.key].filter((_, itemIndex) => itemIndex !== index) })} className="flex items-center gap-1 px-2.5 py-2 text-sm text-red-600 hover:bg-red-50 rounded"><FiTrash2 /> <span className="hidden sm:inline">Delete</span></button>
                  </div>
                </header>
                <div className={`p-5 grid gap-4 ${group.key === 'skills' ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                  <label className="text-sm font-medium text-gray-700">
                    <span className="block mb-1.5">{titleLabels[group.key]}</span>
                    <input className={fieldClass} value={entry.title} onChange={e => updateEntry(group.key, index, 'title', e.target.value)} />
                  </label>
                  {group.key === 'skills' && (
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium text-gray-700">Icon</legend>
                      {(() => {
                        const selectedOption = skillIconOptions.find(option => option.value === (entry.icon || 'lightbulb')) || skillIconOptions[3];
                        const SelectedIcon = selectedOption.Icon;
                        const isOpen = openSkillIconIndex === index;
                        return (
                          <>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpenSkillIconIndex(isOpen ? null : index)}
                              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left hover:border-blue-500 hover:bg-blue-50/40"
                            >
                              <span className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-xl text-amber-600"><SelectedIcon aria-hidden="true" /></span>
                                <span><span className="block text-sm font-medium text-gray-900">{selectedOption.label}</span><span className="block text-xs text-gray-500">Click to change icon</span></span>
                              </span>
                              <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isOpen && (
                              <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                {skillIconOptions.map(({ value, label, Icon }) => {
                                  const selected = selectedOption.value === value;
                                  return (
                                    <button
                                      key={value}
                                      type="button"
                                      aria-pressed={selected}
                                      onClick={() => { updateEntry(group.key, index, 'icon', value); setOpenSkillIconIndex(null); }}
                                      className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border p-2 text-xs transition-colors ${selected ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}`}
                                    >
                                      <Icon className="text-2xl" aria-hidden="true" />
                                      <span>{label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </fieldset>
                  )}
                  {group.key !== 'skills' && <label className="text-sm font-medium text-gray-700"><span className="block mb-1.5">Organization or subtitle</span><input className={fieldClass} value={entry.subtitle || ''} onChange={e => updateEntry(group.key, index, 'subtitle', e.target.value)} /></label>}
                  {group.key !== 'skills' && <label className="text-sm font-medium text-gray-700"><span className="block mb-1.5">Date or period</span><input className={fieldClass} value={entry.period || ''} onChange={e => updateEntry(group.key, index, 'period', e.target.value)} /></label>}
                  {(group.key === 'education' || group.key === 'experiences') && <label className="text-sm font-medium text-gray-700"><span className="block mb-1.5">Logo or image path <span className="font-normal text-gray-400">(optional)</span></span><input className={fieldClass} value={entry.image || ''} onChange={e => updateEntry(group.key, index, 'image', e.target.value)} /></label>}
                  {group.key === 'awards' && <label className="text-sm font-medium text-gray-700"><span className="block mb-1.5">Symbol or emoji</span><input className={fieldClass} value={entry.icon || ''} onChange={e => updateEntry(group.key, index, 'icon', e.target.value)} /></label>}
                  {group.key !== 'skills' && <label className="text-sm font-medium text-gray-700 md:col-span-2"><span className="block mb-1.5">Description</span><textarea rows={3} className={fieldClass} value={entry.description || ''} onChange={e => updateEntry(group.key, index, 'description', e.target.value)} /></label>}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex items-center justify-end gap-4 bg-white border rounded-lg p-4 shadow-lg">
        {message && <p className="mr-auto text-sm text-gray-700">{message}</p>}
        <button onClick={save} disabled={saving || !profile.aboutTitle || !profile.biography} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"><FiSave /> {saving ? 'Saving…' : 'Save About page'}</button>
      </div>
    </div>
  );
}
