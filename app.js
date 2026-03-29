const initialClubs = [
  {
    id: "film",
    name: "电影社",
    category: "arts",
    commitment: "medium",
    goals: ["expression", "friends"],
    description: "组织观影、影评分享、短片拍摄和校内放映活动。",
    weeklyHours: "3-4小时",
    difficulty: "中等",
    interviewRounds: "1轮交流",
    rookieFriendly: "新手友好",
    processNote: "在线报名 -> 兴趣交流 -> 入群试运行",
    tags: ["文艺", "影像", "同好社交", "表达机会"]
  },
  {
    id: "ai",
    name: "人工智能社",
    category: "technology",
    commitment: "high",
    goals: ["skill", "resume"],
    description: "适合想做项目、学习算法和参加技术比赛的同学。",
    weeklyHours: "6-8小时",
    difficulty: "较高",
    interviewRounds: "2轮面试",
    rookieFriendly: "需要基础，接受认真学习的新手",
    processNote: "在线报名 -> 技术问答 -> 面试 -> 结果通知",
    tags: ["科技", "项目", "技能提升", "比赛经历"]
  },
  {
    id: "basketball",
    name: "篮球社",
    category: "sports",
    commitment: "medium",
    goals: ["friends"],
    description: "固定训练、友谊赛和院系联赛为主，适合稳定参与。",
    weeklyHours: "3-5小时",
    difficulty: "中等",
    interviewRounds: "公开训练",
    rookieFriendly: "看态度和出勤",
    processNote: "报名 -> 参加公开训练 -> 确认加入",
    tags: ["运动", "团队", "同好社交", "规律参与"]
  },
  {
    id: "volunteer",
    name: "志愿服务社",
    category: "social",
    commitment: "light",
    goals: ["friends"],
    description: "组织社区服务、公益活动和校园志愿项目。",
    weeklyHours: "1-2小时",
    difficulty: "较低",
    interviewRounds: "1轮沟通",
    rookieFriendly: "非常友好",
    processNote: "报名 -> 志愿方向选择 -> 入组安排",
    tags: ["公益", "服务", "低门槛", "团队活动"]
  },
  {
    id: "media",
    name: "融媒体社",
    category: "media",
    commitment: "high",
    goals: ["resume", "expression"],
    description: "负责采访、写稿、运营和校园内容策划。",
    weeklyHours: "5-7小时",
    difficulty: "较高",
    interviewRounds: "作品/笔试 + 面试",
    rookieFriendly: "有作品更好",
    processNote: "报名 -> 作品提交 -> 面试 -> 部门分配",
    tags: ["传媒", "采访", "内容", "项目经历"]
  },
  {
    id: "music",
    name: "音乐社",
    category: "arts",
    commitment: "medium",
    goals: ["expression"],
    description: "涵盖演唱、器乐、排练和校内演出。",
    weeklyHours: "3-5小时",
    difficulty: "中等",
    interviewRounds: "试音/交流",
    rookieFriendly: "接受零基础兴趣者",
    processNote: "报名 -> 试音 -> 排练分组 -> 演出安排",
    tags: ["文艺", "舞台", "表达机会", "创作"]
  }
];

const initialApplications = [
  { id: 1, user: "演示学生", clubId: "film", status: "interview", note: "周三晚交流", updatedAt: "今天 15:20" },
  { id: 2, user: "演示学生", clubId: "volunteer", status: "admitted", note: "已通过，等待分组", updatedAt: "昨天 18:10" },
  { id: 3, user: "周可", clubId: "media", status: "interview", note: "待确认面试时间", updatedAt: "今天 11:40" },
  { id: 4, user: "林然", clubId: "ai", status: "pending", note: "等待技术初筛", updatedAt: "今天 09:10" },
  { id: 5, user: "许澈", clubId: "music", status: "interview", note: "需确认试音时段", updatedAt: "昨天 20:30" }
];

const initialSchedules = [
  { id: 1, clubId: "ai", title: "人工智能社一面", time: "周三 19:00-20:00", owner: "林然 / 王栩", conflict: false },
  { id: 2, clubId: "media", title: "融媒体社面试", time: "周三 19:30-20:30", owner: "周可 / 许澈", conflict: true },
  { id: 3, clubId: "music", title: "音乐社试音", time: "周四 18:00-19:30", owner: "许澈 / 赵言", conflict: false }
];

const STORAGE_KEY = "club-platform-state-v2";

const state = loadState();

const authScreen = document.getElementById("authScreen");
const studentApp = document.getElementById("studentApp");
const adminApp = document.getElementById("adminApp");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const studentWelcome = document.getElementById("studentWelcome");
const adminWelcome = document.getElementById("adminWelcome");
const studentLogout = document.getElementById("studentLogout");
const adminLogout = document.getElementById("adminLogout");
const studentInterestFilter = document.getElementById("studentInterestFilter");
const studentTimeFilter = document.getElementById("studentTimeFilter");
const studentClubList = document.getElementById("studentClubList");
const studentDetailName = document.getElementById("studentDetailName");
const studentDetailMetrics = document.getElementById("studentDetailMetrics");
const studentDetailContent = document.getElementById("studentDetailContent");
const saveClubBtn = document.getElementById("saveClubBtn");
const applyClubBtn = document.getElementById("applyClubBtn");
const matcherForm = document.getElementById("matcherForm");
const matchResults = document.getElementById("matchResults");
const studentApplications = document.getElementById("studentApplications");
const studentAppliedCount = document.getElementById("studentAppliedCount");
const studentPendingCount = document.getElementById("studentPendingCount");
const studentSavedCount = document.getElementById("studentSavedCount");
const savedClubList = document.getElementById("savedClubList");
const applyPreview = document.getElementById("applyPreview");
const applyForm = document.getElementById("applyForm");
const applyReasonInput = document.getElementById("applyReasonInput");
const adminClubSelector = document.getElementById("adminClubSelector");
const clubForm = document.getElementById("clubForm");
const clubNameInput = document.getElementById("clubNameInput");
const clubDescInput = document.getElementById("clubDescInput");
const clubHoursInput = document.getElementById("clubHoursInput");
const clubProcessInput = document.getElementById("clubProcessInput");
const adminSummary = document.getElementById("adminSummary");
const adminStats = document.getElementById("adminStats");
const candidateList = document.getElementById("candidateList");
const candidateFilters = document.getElementById("candidateFilters");
const scheduleForm = document.getElementById("scheduleForm");
const scheduleTitleInput = document.getElementById("scheduleTitleInput");
const scheduleTimeInput = document.getElementById("scheduleTimeInput");
const scheduleOwnerInput = document.getElementById("scheduleOwnerInput");
const scheduleList = document.getElementById("scheduleList");
const adminTodos = document.getElementById("adminTodos");

let loginRole = "student";
let selectedStudentClubId = state.student.selectedClubId || state.clubs[0].id;
let currentCandidateFilter = "all";
let pendingApplyClubId = null;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    session: null,
    clubs: initialClubs,
    applications: initialApplications,
    schedules: initialSchedules,
    student: {
      savedClubIds: [],
      selectedClubId: initialClubs[0].id
    }
  };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clubById(clubId) {
  return state.clubs.find((club) => club.id === clubId);
}

function currentStudentApplications() {
  if (!state.session) {
    return [];
  }

  return state.applications.filter((item) => item.user === state.session.username);
}

function studentCounts() {
  const apps = currentStudentApplications();
  return {
    applied: apps.length,
    pending: apps.filter((item) => item.status === "pending" || item.status === "interview").length,
    saved: state.student.savedClubIds.length
  };
}

function adminCounts(clubId) {
  const apps = state.applications.filter((item) => item.clubId === clubId);
  return {
    total: apps.length,
    pending: apps.filter((item) => item.status === "pending").length,
    interview: apps.filter((item) => item.status === "interview").length,
    admitted: apps.filter((item) => item.status === "admitted").length
  };
}

function statusClass(status) {
  return `status-chip status-${status}`;
}

function statusText(status) {
  const labels = {
    pending: "待筛选",
    interview: "待面试",
    admitted: "已录取",
    rejected: "未录取"
  };

  return labels[status] || status;
}

function categoryText(category) {
  const labels = {
    technology: "科技",
    arts: "文艺",
    sports: "运动",
    social: "公益",
    media: "传媒"
  };

  return labels[category] || category;
}

function commitmentText(commitment) {
  const labels = {
    under2: "每周低于 2 小时",
    "2to3": "每周 2-3 小时",
    "3to5": "每周 3-5 小时",
    "5to7": "每周 5-7 小时",
    "7plus": "每周 7 小时以上",
    light: "每周低于 3 小时",
    medium: "每周 3-5 小时",
    high: "每周 6 小时以上"
  };

  return labels[commitment] || commitment;
}

function timeFilterMatch(club, filter) {
  if (filter === "all") return true;

  const map = {
    light: ["under2", "2to3"],
    medium: ["3to5"],
    high: ["5to7", "7plus"]
  };

  const clubBands = map[club.commitment] || [];
  return clubBands.includes(filter);
}

function timePreferenceScore(club, filter) {
  if (timeFilterMatch(club, filter)) return 20;
  return 0;
}

function vibeText(category) {
  const labels = {
    technology: "成长驱动",
    arts: "轻松友好",
    sports: "稳定参与",
    social: "轻松友好",
    media: "内容输出"
  };

  return labels[category] || "综合发展";
}

function recommendationScore(club, formData) {
  let score = 0;
  if (club.category === formData.interest) score += 40;
  score += timePreferenceScore(club, formData.commitment);
  if (club.goals.includes(formData.goal)) score += 40;
  return score;
}

function renderAuth() {
  authScreen.classList.toggle("hidden", Boolean(state.session));
  studentApp.classList.toggle("hidden", !state.session || state.session.role !== "student");
  adminApp.classList.toggle("hidden", !state.session || state.session.role !== "admin");

  if (!state.session) {
    return;
  }

  if (state.session.role === "student") {
    studentWelcome.textContent = `${state.session.username}，开始查看社团`;
    renderStudent();
  } else {
    adminWelcome.textContent = `${state.session.username}，开始管理招新`;
    renderAdmin();
  }
}

function renderStudentClubs() {
  const interest = studentInterestFilter.value;
  const time = studentTimeFilter.value;
  const clubs = state.clubs.filter((club) => {
    const hitInterest = interest === "all" || club.category === interest;
    const hitTime = timeFilterMatch(club, time);
    return hitInterest && hitTime;
  });

  studentClubList.innerHTML = clubs
    .map(
      (club) => `
        <article class="club-card ${club.id === selectedStudentClubId ? "is-active" : ""}" data-club-id="${club.id}">
          <div class="club-card-head">
            <div>
              <h4>${club.name}</h4>
              <p>${club.description}</p>
            </div>
            <span class="fit-chip">${categoryText(club.category)}</span>
          </div>
          <div class="tag-row">
            ${club.tags.map((tag) => `<span class="fit-chip">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderStudentDetail() {
  const club = clubById(selectedStudentClubId);

  if (!club) {
    return;
  }

  studentDetailName.textContent = club.name;
  studentDetailMetrics.innerHTML = `
    <div class="metric-card">
      <strong>每周投入</strong>
      <p>${club.weeklyHours}</p>
    </div>
    <div class="metric-card">
      <strong>报名难度</strong>
      <p>${club.difficulty}</p>
    </div>
    <div class="metric-card">
      <strong>报名流程</strong>
      <p>${club.interviewRounds}</p>
    </div>
    <div class="metric-card">
      <strong>新手门槛</strong>
      <p>${club.rookieFriendly}</p>
    </div>
  `;

  studentDetailContent.innerHTML = `
    <h4>社团简介</h4>
    <p>${club.description}</p>
    <h4>实际流程</h4>
    <p>${club.processNote}</p>
  `;
}

function renderStudentApplications() {
  const apps = currentStudentApplications();
  const counts = studentCounts();

  studentAppliedCount.textContent = String(counts.applied);
  studentPendingCount.textContent = String(counts.pending);
  studentSavedCount.textContent = String(counts.saved);

  if (!apps.length) {
    studentApplications.innerHTML = `<div class="empty-state">你还没有报名任何社团。</div>`;
    return;
  }

  studentApplications.innerHTML = apps
    .map((item) => {
      const club = clubById(item.clubId);
      return `
        <article class="application-card">
          <div class="application-head">
            <div>
              <h4>${club.name}</h4>
              <p>${item.note}</p>
            </div>
            <span class="${statusClass(item.status)}">${statusText(item.status)}</span>
          </div>
          <div class="application-tags">
            <span class="fit-chip">最近更新：${item.updatedAt}</span>
            <span class="fit-chip">${club.weeklyHours}</span>
          </div>
          <div class="saved-card-actions">
            <button class="mini-button" type="button" data-open-application="${item.clubId}">查看详情</button>
            <button class="danger-button" type="button" data-remove-application="${item.id}">移除报名</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSavedClubs() {
  const saved = state.student.savedClubIds.map(clubById).filter(Boolean);

  if (!saved.length) {
    savedClubList.innerHTML = `<div class="empty-state">你还没有收藏社团。</div>`;
    return;
  }

  savedClubList.innerHTML = saved
    .map(
      (club) => `
        <article class="saved-card">
          <h4>${club.name}</h4>
          <p>${club.description}</p>
          <div class="tag-row">
            <span class="fit-chip">${categoryText(club.category)}</span>
            <span class="fit-chip">${commitmentText(club.commitment)}</span>
          </div>
          <div class="saved-card-actions">
            <button class="mini-button" type="button" data-open-saved-club="${club.id}">查看详情</button>
            <button class="mini-button" type="button" data-apply-saved-club="${club.id}">去报名</button>
            <button class="danger-button" type="button" data-remove-saved-club="${club.id}">取消收藏</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderApplyPreview() {
  if (!pendingApplyClubId) {
    applyPreview.textContent = "请选择社团后点击“立即报名”。";
    return;
  }

  const club = clubById(pendingApplyClubId);
  applyPreview.innerHTML = `
    <h4>${club.name}</h4>
    <p>${club.description}</p>
    <div class="tag-row">
      <span class="fit-chip">${categoryText(club.category)}</span>
      <span class="fit-chip">${commitmentText(club.commitment)}</span>
      <span class="fit-chip">${club.interviewRounds}</span>
    </div>
  `;
}

function renderStudent() {
  renderStudentClubs();
  renderStudentDetail();
  renderStudentApplications();
  renderSavedClubs();
  renderApplyPreview();
}

function renderMatches(matches) {
  if (!matches.length) {
    matchResults.innerHTML = `<div class="empty-state">暂无结果。</div>`;
    return;
  }

  matchResults.innerHTML = matches
    .map((item, index) => `
      <article class="result-card">
        <div class="result-topline">
          <span class="fit-chip">Top ${index + 1}</span>
          <span class="fit-chip">${categoryText(item.category)}</span>
        </div>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <div class="result-scoreline">
          <strong>匹配度 ${item.score}%</strong>
          <div class="score-bar"><div class="score-fill" style="width: ${item.score}%"></div></div>
        </div>
        <div class="result-tags">
          <span class="fit-chip">${vibeText(item.category)}</span>
          <span class="fit-chip">${commitmentText(item.commitment)}</span>
        </div>
        <ul class="result-notes">
          <li>每周投入：${item.weeklyHours}</li>
          <li>报名流程：${item.processNote}</li>
          <li>新手门槛：${item.rookieFriendly}</li>
        </ul>
        <div class="result-actions">
          <button class="link-button" type="button" data-result-open="${item.id}">查看详情</button>
          <button class="link-button" type="button" data-result-apply="${item.id}">去报名</button>
        </div>
      </article>
    `)
    .join("");
}

function renderAdminSelectors() {
  adminClubSelector.innerHTML = state.clubs.map((club) => `<option value="${club.id}">${club.name}</option>`).join("");
  adminClubSelector.value = state.session.adminClubId;
}

function renderAdminClubForm() {
  const club = clubById(state.session.adminClubId);
  clubNameInput.value = club.name;
  clubDescInput.value = club.description;
  clubHoursInput.value = club.weeklyHours;
  clubProcessInput.value = club.processNote;
}

function renderAdminSummary() {
  const counts = adminCounts(state.session.adminClubId);
  adminSummary.innerHTML = `
    <div>
      <strong>${counts.total}</strong>
      <span>总报名</span>
    </div>
    <div>
      <strong>${counts.pending}</strong>
      <span>待筛选</span>
    </div>
    <div>
      <strong>${counts.interview}</strong>
      <span>待面试</span>
    </div>
  `;
}

function renderAdminStats() {
  const counts = adminCounts(state.session.adminClubId);
  adminStats.innerHTML = `
    <article class="stat-card"><strong>${counts.total}</strong><p>报名总数</p></article>
    <article class="stat-card"><strong>${counts.pending}</strong><p>待筛选</p></article>
    <article class="stat-card"><strong>${counts.interview}</strong><p>待面试</p></article>
    <article class="stat-card"><strong>${counts.admitted}</strong><p>已录取</p></article>
  `;
}

function renderCandidates() {
  const clubId = state.session.adminClubId;
  const rows = state.applications.filter((item) => {
    const hitClub = item.clubId === clubId;
    const hitFilter = currentCandidateFilter === "all" || item.status === currentCandidateFilter;
    return hitClub && hitFilter;
  });

  if (!rows.length) {
    candidateList.innerHTML = `<div class="empty-state">当前筛选条件下没有候选人。</div>`;
    return;
  }

  candidateList.innerHTML = rows
    .map((item) => `
      <article class="candidate-row">
        <div class="candidate-main">
          <strong>${item.user}</strong>
          <p>${item.note}</p>
          <div class="candidate-actions">
            <button class="mini-button" data-app-id="${item.id}" data-next-status="pending">设为待筛选</button>
            <button class="mini-button" data-app-id="${item.id}" data-next-status="interview">设为待面试</button>
            <button class="mini-button" data-app-id="${item.id}" data-next-status="admitted">设为已录取</button>
          </div>
        </div>
        <div class="candidate-meta">
          <span class="${statusClass(item.status)}">${statusText(item.status)}</span>
          <span class="fit-chip">${item.updatedAt}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderSchedules() {
  const rows = state.schedules.filter((item) => item.clubId === state.session.adminClubId);

  if (!rows.length) {
    scheduleList.innerHTML = `<div class="empty-state">还没有面试安排。</div>`;
    return;
  }

  scheduleList.innerHTML = rows
    .map((item) => `
      <article class="schedule-item">
        <div class="schedule-main">
          <strong>${item.title}</strong>
          <p>${item.time}</p>
          <p>${item.owner}</p>
        </div>
        <div class="schedule-meta">
          <span class="conflict-chip ${item.conflict ? "conflict-yes" : "conflict-no"}">${item.conflict ? "有撞档" : "无冲突"}</span>
        </div>
      </article>
    `)
    .join("");
}

function renderTodos() {
  const counts = adminCounts(state.session.adminClubId);
  const todos = [
    `还有 ${counts.pending} 位同学待筛选，请尽快处理。`,
    `${counts.interview} 位同学待安排或确认面试。`,
    `请检查社团信息是否需要更新，避免学生看到过期内容。`
  ];

  adminTodos.innerHTML = todos.map((item) => `<article class="todo-item"><p>${item}</p></article>`).join("");
}

function renderAdmin() {
  renderAdminSelectors();
  renderAdminClubForm();
  renderAdminSummary();
  renderAdminStats();
  renderCandidates();
  renderSchedules();
  renderTodos();
}

function scrollToPanel(panelId) {
  const target = document.getElementById(panelId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function startApplyFlow(clubId) {
  pendingApplyClubId = clubId;
  applyReasonInput.value = "";
  renderApplyPreview();
  scrollToPanel("applyPanel");
}

function login(username, role) {
  state.session = {
    username,
    role,
    adminClubId: role === "admin" ? state.clubs[0].id : null
  };

  if (role === "student" && !state.applications.some((item) => item.user === username)) {
    state.applications.push({
      id: Date.now(),
      user: username,
      clubId: "film",
      status: "pending",
      note: "已创建学生账号后的默认演示报名",
      updatedAt: "刚刚"
    });
  }

  persistState();
  renderAuth();
}

function logout() {
  state.session = null;
  persistState();
  renderAuth();
}

document.querySelectorAll("[data-login-role]").forEach((button) => {
  button.addEventListener("click", () => {
    loginRole = button.dataset.loginRole;
    document.querySelectorAll("[data-login-role]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  login(usernameInput.value.trim(), loginRole);
});

studentLogout.addEventListener("click", logout);
adminLogout.addEventListener("click", logout);

studentInterestFilter.addEventListener("change", renderStudentClubs);
studentTimeFilter.addEventListener("change", renderStudentClubs);

studentClubList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-club-id]");
  if (!card) return;
  selectedStudentClubId = card.dataset.clubId;
  state.student.selectedClubId = selectedStudentClubId;
  persistState();
  renderStudent();
});

saveClubBtn.addEventListener("click", () => {
  if (!state.student.savedClubIds.includes(selectedStudentClubId)) {
    state.student.savedClubIds.push(selectedStudentClubId);
    persistState();
    renderSavedClubs();
  }
  scrollToPanel("savedPanel");
});

applyClubBtn.addEventListener("click", () => {
  startApplyFlow(selectedStudentClubId);
});

matcherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
  const matches = state.clubs
    .map((club) => ({ ...club, score: recommendationScore(club, formData) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  renderMatches(matches);
});

matchResults.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-result-open]");
  const applyButton = event.target.closest("[data-result-apply]");

  if (openButton) {
    selectedStudentClubId = openButton.dataset.resultOpen;
    state.student.selectedClubId = selectedStudentClubId;
    persistState();
    renderStudent();
    scrollToPanel("studentApp");
  }

  if (applyButton) {
    selectedStudentClubId = applyButton.dataset.resultApply;
    state.student.selectedClubId = selectedStudentClubId;
    persistState();
    renderStudent();
    startApplyFlow(selectedStudentClubId);
  }
});

savedClubList.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-saved-club]");
  const applyButton = event.target.closest("[data-apply-saved-club]");
  const removeButton = event.target.closest("[data-remove-saved-club]");

  if (openButton) {
    selectedStudentClubId = openButton.dataset.openSavedClub;
    state.student.selectedClubId = selectedStudentClubId;
    persistState();
    renderStudent();
  }

  if (applyButton) {
    startApplyFlow(applyButton.dataset.applySavedClub);
  }

  if (removeButton) {
    state.student.savedClubIds = state.student.savedClubIds.filter((id) => id !== removeButton.dataset.removeSavedClub);
    persistState();
    renderSavedClubs();
    renderStudentApplications();
  }
});

studentApplications.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-application]");
  const removeButton = event.target.closest("[data-remove-application]");

  if (openButton) {
    selectedStudentClubId = openButton.dataset.openApplication;
    state.student.selectedClubId = selectedStudentClubId;
    persistState();
    renderStudent();
    return;
  }

  if (removeButton) {
    state.applications = state.applications.filter((item) => String(item.id) !== removeButton.dataset.removeApplication);
    persistState();
    renderStudent();
  }
});

applyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!state.session || !pendingApplyClubId) return;
  const exists = state.applications.some((item) => item.user === state.session.username && item.clubId === pendingApplyClubId);
  if (exists) {
    scrollToPanel("studentApplications");
    return;
  }

  state.applications.unshift({
    id: Date.now(),
    user: state.session.username,
    clubId: pendingApplyClubId,
    status: "pending",
    note: applyReasonInput.value.trim() || "报名已提交，等待管理员处理",
    updatedAt: "刚刚"
  });
  pendingApplyClubId = null;
  applyReasonInput.value = "";
  persistState();
  renderStudent();
  scrollToPanel("studentApplications");
});

adminClubSelector.addEventListener("change", (event) => {
  state.session.adminClubId = event.target.value;
  persistState();
  renderAdmin();
});

clubForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const club = clubById(state.session.adminClubId);
  club.name = clubNameInput.value.trim();
  club.description = clubDescInput.value.trim();
  club.weeklyHours = clubHoursInput.value.trim();
  club.processNote = clubProcessInput.value.trim();
  persistState();
  renderAdmin();
});

candidateFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  currentCandidateFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderCandidates();
});

candidateList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-next-status]");
  if (!button) return;

  const application = state.applications.find((item) => String(item.id) === button.dataset.appId);
  application.status = button.dataset.nextStatus;
  application.updatedAt = "刚刚";
  application.note = `状态已更新为${statusText(application.status)}`;
  persistState();
  renderAdmin();
});

scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.schedules.unshift({
    id: Date.now(),
    clubId: state.session.adminClubId,
    title: scheduleTitleInput.value.trim(),
    time: scheduleTimeInput.value.trim(),
    owner: scheduleOwnerInput.value.trim(),
    conflict: scheduleTimeInput.value.includes("周三 19")
  });
  scheduleForm.reset();
  persistState();
  renderSchedules();
  renderTodos();
});

renderAuth();
