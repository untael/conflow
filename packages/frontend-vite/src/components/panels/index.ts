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

export enum PanelNames {
  DashboardPanel = 'Dashboard Panel',
  InterviewDashboardPanel = 'Interview Dashboard Panel',
  InterviewTemplateEditPanel = 'Interview Template Edit Panel',
  InterviewTemplateListPanel = 'Interview Template List Panel',
  InterviewEditPanel = 'Interview Edit Panel',
  QuestionsDashboardPanel = 'Questions Dashboard Panel',
  QuestionsListPanel = 'Questions List Panel',
  QuestionsEditPanel = 'Questions Edit Panel',
}

//Only panels, not their wrappers
export const panelsIterator = [
  new Panel({
    name: PanelNames.DashboardPanel,
    minimized: false,
    component: CfDashboardPanel,
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

