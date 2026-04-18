import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    college: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Fetch the latest profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/profile/me`);
        const u = res.data.user;
        setForm({
          name: u.name || "",
          bio: u.bio || "",
          college: u.college || "",
        });
        setPhotoPreview(u.profilePhoto ? `${API}${u.profilePhoto}` : null);
        updateUser({
          id: u._id,
          name: u.name,
          email: u.email,
          bio: u.bio,
          college: u.college,
          profilePhoto: u.profilePhoto,
          createdAt: u.createdAt,
        });
      } catch (err) {
        console.error(err);
        // Fall back to context data
        if (user) {
          setForm({
            name: user.name || "",
            bio: user.bio || "",
            college: user.college || "",
          });
          setPhotoPreview(
            user.profilePhoto ? `${API}${user.profilePhoto}` : null
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put(`${API}/api/profile/me`, form);
      updateUser(res.data.user);
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Client-side validation
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG and WebP images are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5 MB");
      return;
    }

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.put(`${API}/api/profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const u = res.data.user;
      setPhotoPreview(`${API}${u.profilePhoto}`);
      updateUser(u);
      toast.success("Photo updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "—";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Decorative header band */}
      <div className="profile-hero">
        <div className="profile-hero-pattern" />
      </div>

      <div className="profile-container">
        {/* ─── Avatar card ─── */}
        <div className="profile-avatar-card">
          <button
            type="button"
            onClick={handlePhotoClick}
            className="profile-avatar-btn"
            disabled={uploadingPhoto}
            title="Change profile photo"
          >
            {uploadingPhoto && (
              <div className="profile-avatar-loader">
                <div className="w-8 h-8 rounded-full border-3 border-white/30 border-t-white animate-spin" />
              </div>
            )}

            {photoPreview ? (
              <img
                src={photoPreview}
                alt={user?.name}
                className="profile-avatar-img"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Hover overlay */}
            <div className="profile-avatar-overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span className="text-xs font-medium mt-0.5">Change</span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />

          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-3.5 h-3.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Member since {memberSince}
          </div>
        </div>

        {/* ─── Details card ─── */}
        <div className="profile-details-card">
          <div className="profile-details-header">
            <h3 className="profile-details-title">Personal Information</h3>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="profile-edit-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-field-grid">
              {/* Name */}
              <div className="profile-field">
                <label className="profile-label">Full Name</label>
                {editMode ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="Your name"
                    required
                  />
                ) : (
                  <p className="profile-value">{form.name || "—"}</p>
                )}
              </div>

              {/* Email – always read-only */}
              <div className="profile-field">
                <label className="profile-label">Email Address</label>
                <p className="profile-value profile-value--muted">
                  {user?.email}
                  <span className="profile-verified-badge">Verified</span>
                </p>
              </div>

              {/* College */}
              <div className="profile-field">
                <label className="profile-label">College / University</label>
                {editMode ? (
                  <input
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="e.g. MIT, Stanford…"
                  />
                ) : (
                  <p className="profile-value">
                    {form.college || (
                      <span className="text-gray-300 italic">Not set</span>
                    )}
                  </p>
                )}
              </div>

              {/* Bio — full width */}
              <div className="profile-field profile-field--full">
                <label className="profile-label">Bio</label>
                {editMode ? (
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={3}
                    maxLength={300}
                    className="profile-input profile-textarea"
                    placeholder="Tell us about yourself…"
                  />
                ) : (
                  <p className="profile-value">
                    {form.bio || (
                      <span className="text-gray-300 italic">No bio yet</span>
                    )}
                  </p>
                )}
                {editMode && (
                  <span className="profile-char-count">
                    {form.bio.length} / 300
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            {editMode && (
              <div className="profile-actions">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    // Reset to context values
                    setForm({
                      name: user?.name || "",
                      bio: user?.bio || "",
                      college: user?.college || "",
                    });
                  }}
                  className="profile-cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="profile-save-btn"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
