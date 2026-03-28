import { User } from '../models/db.js';

function buildInitials(name) {
  const chunks = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  const initials = chunks.map((part) => part[0]?.toUpperCase() || '').join('');
  return initials || 'U';
}

function toClientUser(user) {
  return {
    id: user.userCode || String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    initials: user.initials,
    tokens: user.tokens,
    university: user.university,
    department: user.department,
    bio: user.bio,
    skills: user.skills,
    completedProjects: user.completedProjects,
    joinDate: user.joinDate,
    permissions: user.permissions || [],
  };
}

function toCleanString(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  return value.trim();
}

function toSafeInteger(value, fallback = 0) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.max(0, Math.round(next));
}

export async function getMyProfile(req, res) {
  const userId = req.auth?.sub;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({ user: toClientUser(user), permissions: user.permissions || [] });
}

export async function updateMyProfile(req, res) {
  const userId = req.auth?.sub;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const updates = {};

  if (req.body.id !== undefined) {
    updates.userCode = toCleanString(req.body.id);
  }

  if (req.body.name !== undefined) {
    updates.name = toCleanString(req.body.name);
  }

  if (req.body.role !== undefined) {
    updates.role = toCleanString(req.body.role, 'researcher');
  }

  if (req.body.initials !== undefined) {
    updates.initials = toCleanString(req.body.initials).toUpperCase().slice(0, 4);
  }

  if (req.body.university !== undefined) {
    updates.university = toCleanString(req.body.university);
  }

  if (req.body.department !== undefined) {
    updates.department = toCleanString(req.body.department);
  }

  if (req.body.bio !== undefined) {
    updates.bio = toCleanString(req.body.bio);
  }

  if (req.body.skills !== undefined) {
    if (!Array.isArray(req.body.skills)) {
      return res.status(400).json({ message: 'skills must be an array of strings.' });
    }
    updates.skills = req.body.skills.map((skill) => toCleanString(skill)).filter(Boolean);
  }

  if (req.body.completedProjects !== undefined) {
    updates.completedProjects = toSafeInteger(req.body.completedProjects, user.completedProjects);
  }

  if (req.body.joinDate !== undefined) {
    updates.joinDate = toCleanString(req.body.joinDate);
  }

  if (req.body.tokens !== undefined) {
    updates.tokens = toSafeInteger(req.body.tokens, user.tokens);
  }

  if (updates.name && !updates.initials) {
    updates.initials = buildInitials(updates.name);
  }

  if (!updates.initials && !user.initials) {
    updates.initials = buildInitials(updates.name || user.name);
  }

  Object.assign(user, updates);
  await user.save();

  return res.json({ user: toClientUser(user), permissions: user.permissions || [] });
}
