import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { PageShell } from '../components/PageShell'
import { Button, Card } from '../components/ui'
import { createAnnouncement, getAnnouncements } from '../services/announcementService'

export function AdminAnnouncementsPage() {
  const [items, setItems] = useState(getAnnouncements()); const [title, setTitle] = useState(''); const [description, setDescription] = useState('')
  const publish = (event: React.FormEvent) => { event.preventDefault(); if (!title.trim() || !description.trim()) return; createAnnouncement({ title, description, category: 'Program', program: 'All' }); setItems(getAnnouncements()); setTitle(''); setDescription('') }
  return <PageShell title="Announcements" subtitle="Share the right update with the right learning community."><div className="admin-announcements-layout"><Card><p className="eyebrow">Create update</p><h3>Keep your community informed</h3><form className="auth-form" onSubmit={publish}><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="New module available" /></label><label>Message<textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write a clear, helpful update..." /></label><label>Audience<select><option>Entire platform</option><option>Specific program</option><option>Specific academy</option><option>Specific course</option></select></label><Button variant="primary" type="submit">Publish announcement</Button></form></Card><section className="admin-announcement-list"><p className="eyebrow">Published updates</p>{items.slice().reverse().map((item) => <article key={item.id}><div><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div><div><button aria-label="Edit announcement"><Pencil size={16} /></button><button aria-label="Delete announcement"><Trash2 size={16} /></button></div></article>)}</section></div></PageShell>
}
