export type TabType = 'feed' | 'dashboard' | 'post' | 'tokens' | 'user';
export type ProjectStatus = 'open' | 'in-progress' | 'completed';
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
  tokens: number;
  university: string;
  department: string;
  bio: string;
  skills: string[];
  completedProjects: number;
  joinDate: string;
}

export type TokenBundle = {
  id: string;
  amount: number;
  priceLabel: string;
  badge?: string;
  description: string;
};

export interface Project {
  id: string;
  title: string;
  domain: string;
  description: string;
  requiredRoles: string[];
  status: ProjectStatus;
  creator: string;
  creatorRole: string;
  costToApply: number;
  applicants: number;
  deadline: string;
  tags: string[];
  maxTeamSize: number;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  status: 'active' | 'pending';
  isCurrentUser?: boolean;
}

export interface Milestone {
  title: string;
  completed: boolean;
}

export interface PendingApproval {
  applicationId: string;
  userId: string;
  name: string;
  role: string;
  submittedAt: string;
}

export interface ApplicantQueueItem {
  applicationId: string;
  userId: string;
  name: string;
  role: string;
  message: string;
  appliedAt: string;
}

export interface ActiveContributorItem {
  applicationId: string;
  userId: string;
  name: string;
  role: string;
  submissionStatus: 'not_submitted' | 'submitted' | 'approved' | 'rejected';
  submittedAt: string;
  status: 'accepted' | 'locked-in' | 'pending' | 'rejected' | 'withdrawn';
}

export interface ActiveProject {
  id: string;
  title: string;
  domain: string;
  description: string;
  progress: number;
  team: TeamMember[];
  myRole: string;
  myTaskTitle: string;
  myTaskCompleted: boolean;
  deadline: string;
  tags: string[];
  milestones: Milestone[];
  isOwner?: boolean;
  applicationId?: string;
  submissionStatus?: 'not_submitted' | 'submitted' | 'approved' | 'rejected';
  pendingApprovals?: PendingApproval[];
  applicantsQueue?: ApplicantQueueItem[];
  activeContributors?: ActiveContributorItem[];
}

export interface ArchivedProject {
  id: string;
  projectId: string;
  title: string;
  domain: string;
  role: string;
  isOwner: boolean;
  outcome: string;
  rewardTokens: number;
  completedOn: string;
  tags: string[];
}

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  message: string;
  tokenDelta?: number;
}
