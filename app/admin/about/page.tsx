'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LoadingSpinner from '@/components/LoadingSpinner';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Value {
  title: string;
  description: string;
}

interface AboutData {
  _id?: string;
  title: string;
  description: string;
  mission: string;
  vision: string;
  team: TeamMember[];
  companyHistory: string;
  values: Value[];
}

export default function AboutAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData>({
    title: '',
    description: '',
    mission: '',
    vision: '',
    team: [{ name: '', position: '', bio: '', image: '' }],
    companyHistory: '',
    values: [{ title: '', description: '' }]
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        } else {
          // If no data exists yet, we'll use the default empty state
          console.log('No about data found, using default empty state');
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about data');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedTeam = [...aboutData.team];
    updatedTeam[index] = { ...updatedTeam[index], [field]: value };
    setAboutData({ ...aboutData, team: updatedTeam });
  };

  const handleValueChange = (index: number, field: keyof Value, value: string) => {
    const updatedValues = [...aboutData.values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    setAboutData({ ...aboutData, values: updatedValues });
  };

  const addTeamMember = () => {
    setAboutData({
      ...aboutData,
      team: [...aboutData.team, { name: '', position: '', bio: '', image: '' }]
    });
  };

  const removeTeamMember = (index: number) => {
    const updatedTeam = aboutData.team.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, team: updatedTeam });
  };

  const addValue = () => {
    setAboutData({
      ...aboutData,
      values: [...aboutData.values, { title: '', description: '' }]
    });
  };

  const removeValue = (index: number) => {
    const updatedValues = aboutData.values.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, values: updatedValues });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const method = aboutData._id ? 'PUT' : 'POST';
      const response = await fetch('/api/about', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutData),
      });

      if (!response.ok) {
        throw new Error('Failed to save about data');
      }

      const savedData = await response.json();
      setAboutData(savedData);
      alert('About data saved successfully!');
    } catch (err) {
      console.error('Error saving about data:', err);
      setError('Failed to save about data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage About Us Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={aboutData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1 border border-gray-300 rounded-md">
              <CKEditor
                editor={ClassicEditor}
                data={aboutData.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAboutData(prev => ({ ...prev, description: data }));
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Mission</label>
            <div className="mt-1 border border-gray-300 rounded-md">
              <CKEditor
                editor={ClassicEditor}
                data={aboutData.mission}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAboutData(prev => ({ ...prev, mission: data }));
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Vision</label>
            <div className="mt-1 border border-gray-300 rounded-md">
              <CKEditor
                editor={ClassicEditor}
                data={aboutData.vision}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAboutData(prev => ({ ...prev, vision: data }));
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Company History</label>
            <div className="mt-1 border border-gray-300 rounded-md">
              <CKEditor
                editor={ClassicEditor}
                data={aboutData.companyHistory}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAboutData(prev => ({ ...prev, companyHistory: data }));
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <button
              type="button"
              onClick={addTeamMember}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Team Member
            </button>
          </div>
          
          {aboutData.team.map((member, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md space-y-3">
              <div className="flex justify-between">
                <h3 className="font-medium">Team Member {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={member.position}
                  onChange={(e) => handleTeamMemberChange(index, 'position', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="mt-1 border border-gray-300 rounded-md">
                  <CKEditor
                    editor={ClassicEditor}
                    data={member.bio}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleTeamMemberChange(index, 'bio', data);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={member.image}
                  onChange={(e) => handleTeamMemberChange(index, 'image', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Company Values</h2>
            <button
              type="button"
              onClick={addValue}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Value
            </button>
          </div>
          
          {aboutData.values.map((value, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md space-y-3">
              <div className="flex justify-between">
                <h3 className="font-medium">Value {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={value.title}
                  onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={value.description}
                  onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
          >
            {saving ? 'Saving...' : 'Save About Us Data'}
          </button>
        </div>
      </form>
    </div>
  );
}