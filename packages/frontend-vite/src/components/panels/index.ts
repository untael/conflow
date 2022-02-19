import Panel from '@/api/Panel'
import CfInterviewTemplateEditPanel
  from '@/components/interview/template/panels/CfInterviewTemplateEditPanel.vue'
import CfQuestionEditPanel
  from '@/components/question/panels/CfQuestionEditPanel.vue'
import CfInterviewEditPanel
  from '@/components/interview/panels/CfInterviewEditPanel.vue'
import CfDashboardPanel from '@/components/dashboard/CfDashboardPanel.vue'
import CfQuestionsDashboardPanel
  from '@/components/question/panels/CfQuestionsDashboardPanel.vue'
import CfInterviewDashboardPanel
  from '@/components/interview/panels/CfInterviewDashboardPanel.vue'
import CfQuestionsListPanel
  from '@/components/question/panels/CfQuestionsListPanel.vue'
import CfInterviewTemplateListPanel
  from '@/components/interview/template/panels/CfInterviewTemplateListPanel.vue'
import CfInterviewListPanel
  from '@/components/interview/panels/CfInterviewListPanel.vue'
import CfUserProfilePanel
  from '@/components/profile/panels/CfUserProfilePanel.vue'
import CfInterviewProcessPanel
  from '@/components/interview/panels/CfInterviewProcessPanel.vue'

export enum PanelNames {
  DashboardPanel = 'Dashboard Panel',
  UserProfilePanel = 'User Profile Panel',
  InterviewDashboardPanel = 'Interview Dashboard Panel',
  InterviewListPanel = 'Interview List Panel',
  InterviewTemplateEditPanel = 'Interview Template Edit Panel',
  InterviewTemplateListPanel = 'Interview Template List Panel',
  InterviewEditPanel = 'Interview Edit Panel',
  InterviewProcessPanel = 'Interview Process Panel',
  QuestionsDashboardPanel = 'Questions Dashboard Panel',
  QuestionsListPanel = 'Questions List Panel',
  QuestionsEditPanel = 'Questions Edit Panel',
  QuestionsDisplayPanel = 'Questions Display Panel',
}

//Only panels, not their wrappers
export const panelsIterator = [
  new Panel({
    name: PanelNames.DashboardPanel,
    minimized: false,
    component: CfDashboardPanel,
  }),
  new Panel({
    name: PanelNames.UserProfilePanel,
    minimized: false,
    component: CfUserProfilePanel,
  }),
  new Panel({
    name: PanelNames.InterviewListPanel,
    minimized: false,
    component: CfInterviewListPanel,
  }),
  new Panel({
    name: PanelNames.InterviewProcessPanel,
    minimized: false,
    component: CfInterviewProcessPanel,
  }),
  new Panel({
    name: PanelNames.QuestionsDashboardPanel,
    minimized: false,
    component: CfQuestionsDashboardPanel,
  }),
  new Panel({
    name: PanelNames.QuestionsListPanel,
    minimized: false,
    component: CfQuestionsListPanel,
  }),
  new Panel({
    name: PanelNames.QuestionsEditPanel,
    minimized: false,
    component: CfQuestionEditPanel,
  }),
  new Panel({
    name: PanelNames.QuestionsDisplayPanel,
    minimized: false,
    component: CfQuestionEditPanel,
    props: {
      editable: false,
    }
  }),
  new Panel({
    name: PanelNames.InterviewDashboardPanel,
    minimized: false,
    component: CfInterviewDashboardPanel,
  }),
  new Panel({
    name: PanelNames.InterviewTemplateEditPanel,
    minimized: false,
    component: CfInterviewTemplateEditPanel,
  }),
  new Panel({
    name: PanelNames.InterviewTemplateListPanel,
    minimized: false,
    component: CfInterviewTemplateListPanel,
  }),
  new Panel({
    name: PanelNames.InterviewEditPanel,
    minimized: false,
    component: CfInterviewEditPanel,
  }),
]

export const PanelList = [
  ...panelsIterator,
]

