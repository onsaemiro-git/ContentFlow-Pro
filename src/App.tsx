/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Youtube, 
  PenTool, 
  BarChart3, 
  Instagram, 
  Sun, 
  Moon, 
  HelpCircle, 
  ArrowRight, 
  Settings, 
  TrendingUp,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Loader2,
  Maximize2,
  Copy,
  CheckCircle2,
  History,
  Library,
  Clock,
  Bookmark,
  ChevronRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Channel = '전문가 칼럼' | 'SEO 블로그' | '티스토리 HTML' | '인포그래픽 기획' | '인스타 뉴스' | '유튜브 쇼츠';
type View = 'analysis' | 'history' | 'library';

interface ContentTemplate {
  title: string;
  hook: string;
  story: string;
  offer: string;
  fullText: string;
  metaTitle: string;
  metaDesc: string;
  imagePrompt: string;
}

interface HistoryItem {
  id: string;
  topic: string;
  date: string;
  channels: Channel[];
}

interface LibraryItem {
  id: string;
  title: string;
  channel: Channel;
  date: string;
}

// --- Mock Data Generator ---
const getInitialContent = (topic: string): Record<Channel, ContentTemplate> => ({
  'SEO 블로그': {
    title: `${topic} 완벽 가이드: 당신이 몰랐던 5가지 핵심 비결`,
    hook: `[HOOK]\n단순한 정보가 아닙니다. 당신의 삶을 근본적으로 바꿀 ${topic}의 모든 것을 1,500자 이상의 압도적 정보량으로 공개합니다. 지금 이 글을 읽는 것만으로도 당신은 ${topic} 분야의 상위 1% 지식을 갖게 될 것입니다.`,
    story: `[STORY]\n수많은 데이터와 실전 사례를 통해 검증된 ${topic}의 놀라운 변화. 10년 전의 저와 지금의 저를 바꾼 결정적인 계기는 바로 ${topic}에 대한 올바른 이해였습니다. 이제 당신이 그 주인공이 될 차례입니다.`,
    offer: `[OFFER]\n지금 바로 하단의 상세 가이드를 통해 ${topic} 마스터로 거듭나세요. 글 하단에는 오직 독자분들만을 위한 특별한 ${topic} 체크리스트 PDF 링크가 포함되어 있습니다.`,
    fullText: `[SEO 블로그 전문 원고 - 1,500자 이상 규격 준수]\n\n## 1. ${topic}의 현대적 정의와 필요성: 왜 지금인가?\n\n현대 사회에서 ${topic}은 단순한 선택의 영역을 넘어 생존과 직결된 필수 요소로 자리 잡았습니다. 많은 이들이 ${topic}의 중요성을 인지하고 있지만, 정작 이를 어떻게 체계적으로 관리해야 하는지에 대해서는 무지한 경우가 많습니다. 본 가이드에서는 ${topic}이 우리 삶에 미치는 다각적인 영향력을 분석하고, 실질적으로 적용 가능한 5가지 핵심 전략을 제시하고자 합니다. 첫 번째 단계는 ${topic}에 대한 고정관념을 깨는 것입니다. 단순히 '좋다'는 막연한 믿음보다는 과학적 근거에 기반한 접근이 필요합니다. 우리가 일상에서 마주하는 수많은 선택지 중에서 ${topic}을 최우선 순위에 두어야 하는 이유는 명확합니다. 그것은 바로 지속 가능한 삶의 질을 결정짓는 가장 강력한 변수이기 때문입니다.\n\n## 2. ${topic}이 신체 및 정신 건강에 미치는 메커니즘 분석\n\n${topic}은 우리 몸의 세포 수준에서부터 변화를 일으킵니다. 특히 신경계와의 상호작용을 통해 스트레스 호르몬인 코르티솔 수치를 조절하고, 행복 호르몬이라 불리는 세로토닌의 분비를 촉진하는 역할을 합니다. 이러한 생화학적 변화는 단순히 기분이 좋아지는 수준을 넘어, 장기적으로 면역 체계를 강화하고 만성 질환의 위험을 획기적으로 낮추는 결과로 이어집니다. 연구 데이터에 따르면 ${topic}을 규칙적으로 관리한 그룹은 그렇지 않은 그룹에 비해 인지 기능 저하 속도가 30% 이상 느리게 나타났습니다. 또한 심혈관 건강 지표에서도 유의미한 개선 효과가 관찰되었습니다. 이는 ${topic}이 단순한 심리적 위안을 넘어 실질적인 생물학적 이득을 제공한다는 명백한 증거입니다.\n\n### 2.1. 영양학적 관점에서의 ${topic} 최적화 전략\n\n${topic}의 효과를 극대화하기 위해서는 영양학적 뒷받침이 필수적입니다. 특정 영양소의 결핍은 ${topic}의 효율을 떨어뜨릴 뿐만 아니라, 오히려 역효과를 불러올 수 있습니다. 따라서 항산화 성분이 풍부한 식단과 병행하는 것이 중요하며, 특히 오메가-3 지방산과 비타민 B군이 ${topic}과의 시너지가 가장 높다는 점을 명심해야 합니다. 마그네슘과 아연 역시 ${topic} 대사 과정에서 중요한 촉매제 역할을 수행하므로, 균형 잡힌 영양 섭취는 ${topic} 마스터를 위한 기본 전제 조건이라 할 수 있습니다.\n\n## 3. 실전 적용: ${topic} 마스터를 위한 5단계 로직 가이드\n\n첫째, 명확한 목표 설정입니다. ${topic}을 통해 얻고자 하는 바를 구체화하세요. 막연한 건강 증진이 아니라 '3개월 내 ${topic} 지표 20% 개선'과 같은 수치화된 목표가 필요합니다. 둘째, 환경 조성입니다. 주변 환경이 ${topic}을 방해하지 않도록 정리해야 합니다. 스마트폰 알림을 끄거나 전용 공간을 마련하는 등의 노력이 필요합니다. 셋째, 점진적 부하의 원칙입니다. 처음부터 무리하기보다는 조금씩 강도를 높여가는 것이 지속 가능성의 핵심입니다. 넷째, 기록과 피드백입니다. 매일의 ${topic} 실천을 기록하고 스스로를 점검하세요. 다섯째, 전문가와의 상담입니다. 독학보다는 검증된 전문가의 가이드를 따르는 것이 시행착오를 줄이는 가장 빠른 길입니다. 이 5단계를 충실히 이행한다면 당신은 반드시 ${topic}의 결실을 맺을 것입니다.\n\n## 4. ${topic} 관리 시 주의사항 및 흔한 실수들 (반드시 필독)\n\n가장 흔한 실수는 단기간에 눈에 보이는 성과를 기대하는 것입니다. ${topic}은 마라톤과 같습니다. 조급함은 오히려 스트레스를 유발하여 ${topic}의 긍정적인 효과를 상쇄시킵니다. 또한, 타인의 방식이 나에게도 무조건 맞을 것이라는 생각은 위험합니다. 자신의 체질과 생활 패턴에 맞는 '커스텀 ${topic}'을 찾는 과정이 반드시 필요합니다. 과유불급이라는 말처럼, 지나친 ${topic} 몰입은 일상생활의 불균형을 초래할 수 있으므로 적절한 휴식과 병행해야 합니다. 특히 잘못된 정보에 기반한 ${topic} 실천은 건강을 해칠 수 있으므로, 항상 출처가 명확한 정보를 선별하는 능력을 길러야 합니다.\n\n## 5. 결론: ${topic}과 함께하는 새로운 미래의 시작\n\n결국 ${topic}은 더 나은 나를 향한 여정입니다. 오늘 당신이 투자한 10분의 ${topic} 관리는 10년 뒤 당신의 건강 자산이 되어 돌아올 것입니다. 이 글에서 제시한 가이드라인을 바탕으로 지금 당장 작은 것부터 실천해 보시기 바랍니다. ${topic}은 당신을 배신하지 않습니다. 꾸준함이 비범함을 만든다는 진리를 ${topic}을 통해 직접 경험해 보시길 바랍니다. 당신의 ${topic} 여정에 ContentFlow Pro가 항상 함께하겠습니다. 더 궁금한 점이 있다면 언제든 댓글이나 커뮤니티를 통해 문의해 주세요. 당신의 변화된 내일을 응원합니다.`,
    metaTitle: `${topic} 완벽 가이드 | 전문가가 전하는 1,500자 핵심 리포트`,
    metaDesc: `${topic}의 정의부터 실전 적용 5단계, 주의사항까지. 1,500자 이상의 압도적 분량으로 정리한 ${topic} 마스터 클래스입니다.`,
    imagePrompt: `A professional, high-end editorial photography of ${topic} concept, clean minimalist background, soft natural lighting, 8k resolution, cinematic composition.`
  },
  '티스토리 HTML': {
    title: `[HTML] ${topic} 최적화 포스팅 코드 (고관여 버전)`,
    hook: `[HOOK]\n<h2 style="color: #7d5700; border-bottom: 2px solid #fabc46; padding-bottom: 10px;">당신이 몰랐던 ${topic}의 진실, HTML 코드로 완벽 정리</h2>`,
    story: `[STORY]\n<p style="line-height: 1.8; color: #504535;">${topic}은 단순한 유행이 아닙니다. 구조화된 정보를 통해 ${topic}의 가치를 전달하는 가장 효율적인 방법을 제시합니다.</p>`,
    offer: `[OFFER]\n<div style="padding: 20px; background: #fcf9f4; border-radius: 15px; border: 1px solid #d4c4af;"><strong>${topic} 맞춤형 가이드북 무료 다운로드</strong></div>`,
    fullText: `<!-- 티스토리 HTML 원고 시작 -->\n<div class="content-wrapper" style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 800px; margin: 0 auto; color: #333;">\n  <h2 style="color: #7d5700; border-left: 5px solid #7d5700; padding-left: 15px; margin-bottom: 25px;">${topic}의 놀라운 효능과 과학적 근거</h2>\n  <p style="line-height: 1.8;">안녕하세요. 오늘은 현대인의 필수 과제인 <b>${topic}</b>에 대해 심도 있게 알아보겠습니다. 많은 분들이 궁금해하시는 내용을 중심으로 구성했습니다.</p>\n  \n  <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">\n    <h3 style="margin-top: 0; color: #8e4e11;">핵심 요약 포인트</h3>\n    <ul style="list-style-type: square; color: #1c1c19; line-height: 2;">\n      <li><b>면역력 강화:</b> ${topic}은 체내 면역 세포 활성화에 기여합니다.</li>\n      <li><b>피로 회복:</b> 젖산 분해를 도와 빠른 컨디션 회복을 돕습니다.</li>\n      <li><b>혈행 개선:</b> 혈관 탄력성을 높여 원활한 혈액 순환을 지원합니다.</li>\n    </ul>\n  </div>\n\n  <blockquote style="border-left: 5px solid #c68e17; padding: 20px; background: #fcf9f4; font-style: italic; margin: 30px 0;">\n    "${topic}은 단순한 관리가 아니라, 미래의 나에게 보내는 가장 값진 선물입니다." - ContentFlow Pro 수석 에디터\n  </blockquote>\n\n  <h3 style="color: #8e4e11; margin-top: 40px;">실전 ${topic} 활용 3단계 가이드</h3>\n  <ol style="line-height: 2;">\n    <li><b>정기적 실천:</b> 매일 일정한 시간에 ${topic}을 루틴화하세요.</li>\n    <li><b>수분 섭취:</b> ${topic}의 효율을 높이기 위해 하루 2L 이상의 물을 마시세요.</li>\n    <li><b>전문가 피드백:</b> 정기적으로 자신의 상태를 점검하고 조절하세요.</li>\n  </ol>\n\n  <div style="margin-top: 50px; text-align: center; padding: 30px; border: 2px dashed #d4c4af; border-radius: 20px;">\n    <p style="margin-bottom: 15px;">더 자세한 ${topic} 정보가 궁금하신가요?</p>\n    <a href="#" style="background: #7d5700; color: #fff; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: bold;">관련 자료 더보기</a>\n  </div>\n</div>\n<!-- 티스토리 HTML 원고 끝 -->`,
    metaTitle: `티스토리 최적화: ${topic}의 모든 것`,
    metaDesc: `HTML 태그로 구조화된 ${topic} 전문 포스팅입니다. 복사해서 바로 사용하세요.`,
    imagePrompt: `Clean and modern web layout for ${topic} blog post, soft aesthetic, professional typography, high-quality digital illustration.`
  },
  '유튜브 쇼츠': {
    title: `${topic} 60초 완벽 대본 (연출 지시어 포함)`,
    hook: `[HOOK]\n(자막: 헉! 아직도 ${topic} 안 하세요?) 10초만 집중하세요! 당신의 인생이 바뀔 ${topic}의 비밀을 공개합니다.`,
    story: `[STORY]\n뇌 과학이 증명한 ${topic}의 놀라운 효과. 집중력 향상부터 노화 방지까지, 단 60초 만에 정리해 드립니다.`,
    offer: `[OFFER]\n더 자세한 ${topic} 루틴은 고정 댓글 링크를 확인하세요! 구독과 좋아요는 큰 힘이 됩니다.`,
    fullText: `[유튜브 쇼츠 제작 대본 - 60초 분기별 상세 구성]\n\n■ 주제: ${topic} 안 하면 무조건 손해인 이유\n\n[00s-10s: 오프닝 훅 & 시선 강탈]\n- 카메라: 초근접 샷(Extreme Close-up)으로 시작하여 빠르게 바스트 샷으로 전환. 렌즈를 뚫어지게 쳐다보는 강렬한 눈빛.\n- 연출: 제작자가 놀란 표정으로 스마트폰을 보다가 카메라를 응시하며 손가락으로 포인트를 줌.\n- 나레이션: "잠깐! 아직도 ${topic} 미루고 계신가요? 지금 이 영상 안 보시면 10년 뒤에 무조건 후회합니다! 딱 60초만 투자하세요."\n- 자막: (중앙 상단, 빨간색 배경 흰색 글씨) ⚠️ 10년 뒤 후회 확정?\n\n[10s-30s: 핵심 정보 1 - 뇌 과학적 근거]\n- 카메라: 45도 각도 측면 샷, 배경에 ${topic} 관련 복잡한 신경망 모션 그래픽 합성. 카메라가 서서히 줌인.\n- 연출: 손가락으로 화면의 그래픽을 가리키며 열정적으로 설명. 고개를 끄덕이며 확신을 줌.\n- 나레이션: "최신 뇌 과학 연구에 따르면, ${topic}은 전두엽 피질을 자극해 도파민 수치를 최적화합니다. 한마디로 집중력이 3배는 올라간다는 거죠! 뇌 세포가 깨어나는 기분, 느껴보셨나요?"\n- 자막: (중앙, 노란색 네온 효과) 🧠 뇌 세포가 살아난다!\n\n[30s-50s: 핵심 정보 2 - 실전 꿀팁]\n- 카메라: 정면 풀 샷, 실제 ${topic}을 실천하는 짧은 인서트 영상(빠른 몽타주) 교차 편집.\n- 연출: 빠르고 경쾌한 컷 편집(Jump Cut) 활용. 박자에 맞춰 자막이 튀어나옴.\n- 나레이션: "어렵지 않아요. 딱 세 가지만 기억하세요. 첫째, 아침 공복에 실천하기. 둘째, 5분만 투자하기. 셋째, 매일 기록하기. 이 루틴이 당신의 하루를 바꿉니다!"\n- 자막: (하단 바, 흰색 굵은 글씨) 1. 공복 실천 / 2. 5분 투자 / 3. 매일 기록\n\n[50s-60s: 클로징 & CTA]\n- 카메라: 따뜻한 조명의 클로즈업 샷, 부드러운 미소를 지으며 마무리. 카메라가 서서히 줌아웃.\n- 연출: 화면 하단의 구독 버튼을 손가락으로 가리키고 윙크하는 제스처.\n- 나레이션: "더 자세한 ${topic} 루틴이 궁금하다면? 지금 바로 고정 댓글 링크 클릭! 구독하고 저랑 같이 건강해지세요!"\n- 자막: (중앙 하단) 👇 고정 댓글 확인! / 구독 & 좋아요 필수!`,
    metaTitle: `쇼츠 대본: ${topic}의 기적`,
    metaDesc: `#${topic} #건강꿀팁 #60초완성 #동기부여`,
    imagePrompt: `Dynamic and energetic YouTube Shorts thumbnail for ${topic}, high contrast, bold text overlay, 9:16 aspect ratio, 4k resolution.`
  },
  '전문가 칼럼': {
    title: `[전문가 칼럼] 현대인의 뇌 과학과 영양학의 상관관계: ${topic}을 중심으로`,
    hook: `[HOOK]\n단순한 현상을 넘어 본질을 꿰뚫는 시각. 현대 의학이 주목하는 ${topic}의 예방 의학적 가치와 그 이면의 메커니즘을 심층 분석합니다. 이 글은 단순한 가이드를 넘어 학술적 통찰을 제공할 것입니다.`,
    story: `[STORY]\n수년간의 임상 데이터와 최신 뇌 과학 이론을 바탕으로, ${topic}이 인류의 인지 기능 및 생체 리듬에 미치는 영향력을 학술적으로 고찰합니다. 신경 가소성과 영양학적 시너지가 만들어내는 놀라운 결과를 확인하십시오.`,
    offer: `[OFFER]\n본 칼럼이 제시하는 학술적 제언이 귀하의 ${topic} 관리에 있어 새로운 이정표가 되기를 기대합니다. 전문적인 식견을 바탕으로 한 ${topic}의 미래 가치를 지금 바로 만나보십시오.`,
    fullText: `[전문가 칼럼: ${topic}의 생물학적 기전과 인지 신경과학적 고찰 - 2,000자 이상 규격 준수]\n\n저자: ContentFlow Pro 수석 연구원 / 의학 박사\n\n■ 서론: 현대 사회의 질병 구조 변화와 ${topic}의 재발견\n\n21세기 보건 의료의 패러다임은 급격한 전환기를 맞이하고 있습니다. 과거의 '치료(Cure)' 중심 사고에서 '예방(Prevention)'과 '관리(Care)'로의 이동은 필연적인 결과입니다. 이러한 맥락에서 ${topic}은 단순한 라이프스타일의 선택지를 넘어, 인체의 항상성(Homeostasis)을 유지하고 노화에 따른 퇴행성 변화를 억제하는 핵심적인 변수로 부상하고 있습니다. 본 고에서는 ${topic}이 뇌 신경 가소성(Neuroplasticity) 및 미토콘드리아 기능(Mitochondrial Function)에 미치는 영향을 영양학적 관점과 결합하여 심도 있게 논의하고자 합니다. 우리는 왜 ${topic}에 열광하는가? 그 해답은 인간 본연의 생존 본능과 최적의 상태를 지향하는 생물학적 욕구에 맞닿아 있습니다.\n\n■ 본론 1: 신경 가소성과 ${topic}의 상관관계: 뇌는 어떻게 변화하는가?\n\n인간의 뇌는 고정된 조직이 아니라 환경과 자극에 따라 끊임없이 변화하는 가소성을 지니고 있습니다. ${topic}은 뇌 유래 신경 영양 인자(BDNF)의 발현을 촉진하여 시냅스의 연결성을 강화하는 역할을 수행합니다. 특히 해마(Hippocampus) 부위의 신경 발생을 유도함으로써 기억력 감퇴를 예방하고 인지적 유연성을 확보하는 데 결정적인 기여를 합니다. 이는 영양학적으로 볼 때, ${topic} 과정에서 발생하는 특정 대사 산물들이 혈액-뇌 장벽(Blood-Brain Barrier)을 통과하여 신경 보호 효과를 나타내는 기전과 밀접하게 연관되어 있습니다. 최근의 기능적 자기공명영상(fMRI) 연구에 따르면, ${topic}을 장기적으로 실천한 피험자들은 전두엽과 두정엽 사이의 네트워크 효율성이 유의미하게 향상되었음이 확인되었습니다. 이는 ${topic}이 단순한 습관을 넘어 뇌의 물리적 구조를 재설계한다는 것을 시사합니다.\n\n■ 본론 2: 미토콘드리아 대사와 ${topic}의 시너지 효과: 세포 수준의 혁명\n\n세포의 발전소라 불리는 미토콘드리아의 효율성은 곧 생체 에너지의 척도입니다. ${topic}은 미토콘드리아의 생합성을 촉진하고 산화 스트레스로 인한 DNA 손상을 복구하는 시스템을 활성화합니다. 영양학적으로 적절한 미량 영양소(Micronutrients)의 공급이 동반된 ${topic} 관리는 활성 산소(ROS)의 발생을 억제하고 ATP 생산 효율을 극대화합니다. 이러한 생화학적 프로세스는 만성 피로 증후군을 개선하고 전신 염증 수치를 낮추는 데 탁월한 효능을 발휘함이 수많은 임상 시험을 통해 입증된 바 있습니다. 특히 ${topic}은 오토파지(Autophagy, 자가포식) 작용을 유도하여 세포 내 노폐물을 제거하고 세포의 회춘을 돕는 기전을 가지고 있습니다. 이는 항노화 의학 분야에서 ${topic}이 가장 주목받는 이유 중 하나입니다.\n\n■ 본론 3: 영양 유전학적 관점에서의 ${topic} 최적화 전략: 개인 맞춤형 접근\n\n개개인의 유전적 특성에 따른 맞춤형 접근은 ${topic} 관리의 정점입니다. 특정 유전자 변이(예: APOE4, MTHFR 등)를 가진 개체에게 ${topic}이 미치는 영향은 일반적인 경우와 상이할 수 있습니다. 따라서 영양 유전학(Nutrigenetics)적 분석을 바탕으로 한 ${topic} 플랜은 부작용을 최소화하고 이익을 극대화하는 정밀 의료(Precision Medicine)의 실현이라 할 수 있습니다. 이는 단순히 무엇을 먹고 행하느냐의 문제를 넘어, 유전자 발현의 조절(Epigenetics)을 통해 질병의 발현 자체를 제어하는 고차원적인 건강 관리 전략입니다. 예를 들어, 특정 메틸화 경로에 결함이 있는 경우 ${topic}과 함께 고용량의 엽산이나 비타민 B12 섭취가 동반되어야 최적의 결과를 얻을 수 있습니다. 이러한 정밀한 접근은 ${topic}의 가치를 단순한 건강 상식에서 전문적인 의료 영역으로 격상시킵니다.\n\n■ 본론 4: 심리적 회복 탄력성과 ${topic}의 정신 의학적 가치\n\n${topic}의 효능은 신체적 영역에 국한되지 않습니다. 정신 의학적 관점에서 ${topic}은 감정 조절의 핵심인 편도체(Amygdala)의 과잉 활성화를 억제하고, 정서적 안정감을 부여하는 전대상피질의 기능을 강화합니다. 이는 현대인의 고질병인 불안 장애와 우울증 예방에 있어 비약물적 치료 대안으로서의 가능성을 보여줍니다. ${topic}을 통한 몰입(Flow)의 경험은 자아 효능감을 높이고 삶에 대한 통제력을 회복시켜 줍니다. 이러한 심리적 변화는 다시 신체적 건강으로 이어지는 선순환 구조를 형성하며, 전인적 건강(Holistic Health)의 완성을 돕습니다.\n\n■ 결론: 지속 가능한 인류의 건강과 행복을 위한 제언\n\n결론적으로 ${topic}은 현대인이 직면한 수많은 건강 문제에 대한 근본적인 해답을 제시합니다. 뇌 과학과 영양학의 융합적 이해를 바탕으로 한 ${topic} 관리는 단순한 수명 연장이 아닌, '건강 수명(Health Span)'의 연장을 가능케 할 것입니다. 향후 더 많은 다기관 임상 연구를 통해 ${topic}의 표준화된 가이드라인이 확립되어야 하며, 이를 통해 모든 개인이 과학적 근거에 기반한 ${topic}의 혜택을 누릴 수 있는 사회적 시스템 구축이 시급합니다. 우리는 이제 ${topic}을 개인의 선택이 아닌 사회적 책임의 영역으로 인식해야 합니다. 본 칼럼이 그 거대한 여정의 작은 초석이 되기를 바라며, 인류가 ${topic}을 통해 더 높은 차원의 존재로 진화하기를 기대합니다.`,
    metaTitle: `학술 칼럼: ${topic}과 뇌 과학의 융합`,
    metaDesc: `의학 박사가 집필한 ${topic} 심층 분석 칼럼. 2,000자 이상의 전문적인 학술 정보를 확인하세요.`,
    imagePrompt: `Sophisticated academic editorial illustration for ${topic}, brain neural network patterns, molecular structures, gold and navy blue color palette, high-end magazine style.`
  },
  '인포그래픽 기획': {
    title: `${topic} 비주얼 데이터 리포트 (기획안)`,
    hook: `[HOOK]\n복잡한 ${topic} 정보, 이제 한눈에 파악하세요. 데이터 시각화를 통해 ${topic}의 핵심 가치를 명확하게 전달합니다.`,
    story: `[STORY]\n숫자와 그래프로 증명하는 ${topic}의 효과. 전문가들이 엄선한 데이터를 기반으로 한 비주얼 스토리텔링 기획안입니다.`,
    offer: `[OFFER]\n본 기획안을 바탕으로 제작된 인포그래픽은 귀하의 콘텐츠 신뢰도를 200% 향상시킬 것입니다.`,
    fullText: `[인포그래픽 디자인 상세 기획안]\n\n■ 프로젝트명: ${topic} 데이터 사이언스 리포트\n\n1. 메인 타이틀: "${topic}, 당신의 삶을 바꾸는 결정적 지표"\n\n2. 섹션별 상세 구성\n- [Section 1: 통계로 보는 현황]\n  * 내용: 전 세계 ${topic} 관리 인구 추이 (2010-2024). 연평균 성장률(CAGR) 15% 기록.\n  * 시각화: 우상향 꺾은선 그래프와 연도별 주요 마일스톤 표시.\n- [Section 2: 3대 핵심 효능 분석]\n  * 내용: 에너지 증폭(35%), 면역력 강화(28%), 노화 지연(22%). 기타(15%).\n  * 시각화: 3D 입체 도넛 차트 및 각 섹션별 고해상도 아이콘 배치.\n- [Section 3: 실천 가이드라인 타임라인]\n  * 내용: 아침(기상 직후), 점심(식후 1시간), 저녁(취침 전)별 ${topic} 루틴 상세.\n  * 시각화: S자형 타임라인 인포그래픽, 시간대별 컬러 코딩 적용.\n- [Section 4: 전문가 제언 및 Q&A]\n  * 내용: 가장 자주 묻는 질문 3가지와 전문가 답변 요약.\n  * 시각화: 말풍선 형태의 레이아웃.\n\n3. 비주얼 가이드 및 스타일 시트\n- 아이콘: 미니멀리즘 스타일의 벡터 아이콘 (심장, 뇌, 시계, 번개, 방패).\n- 폰트: 제목(Pretendard ExtraBold), 본문(Pretendard Medium).\n- 컬러 팔레트: Primary(#7d5700 - 신뢰), Accent(#fabc46 - 활력), Background(#fcf9f4 - 안정).\n- 여백(White Space): 정보의 밀도가 높으므로 충분한 여백을 두어 가독성 확보.\n\n4. 제작 의도 및 기대 효과\n- 복잡한 의학적/과학적 데이터를 일반인이 이해하기 쉬운 비주얼 언어로 치환하여 정보 격차 해소.\n- 정보의 위계(Hierarchy)를 명확히 하여 시선 유도 및 정보 습득 효율 극대화.\n- 브랜드의 전문성을 강조하고 소셜 미디어 공유를 유도하는 고품질 디자인 지향.`,
    metaTitle: `기획안: ${topic} 인포그래픽`,
    metaDesc: `데이터 기반의 ${topic} 인포그래픽 상세 기획안입니다. 비주얼 마케팅에 활용하세요.`,
    imagePrompt: `Professional data visualization layout for ${topic}, clean infographic elements, vector icons, sophisticated business style, 8k resolution.`
  },
  '인스타 뉴스': {
    title: `${topic} 프리미엄 카드뉴스 (10 슬라이드 구성)`,
    hook: `[HOOK]\n슬라이드를 넘길수록 건강해지는 마법! ${topic} 정복을 위한 10장의 프리미엄 카드뉴스를 공개합니다. 이 정보는 오직 당신만을 위해 준비되었습니다.`,
    story: `[STORY]\n트렌디한 디자인과 깊이 있는 정보의 만남. 인스타그램 유저들의 시선을 사로잡을 ${topic} 콘텐츠의 정석입니다. 10장의 슬라이드에 담긴 ${topic}의 정수를 느껴보세요.`,
    offer: `[OFFER]\n지금 바로 저장하고, 소중한 사람들에게 ${topic}의 가치를 공유해 보세요! 팔로우하시면 매일 새로운 ${topic} 인사이트를 배달해 드립니다.`,
    fullText: `[인스타그램 프리미엄 카드뉴스 10슬라이드 상세 구성안]\n\n■ 주제: ${topic}으로 완성하는 갓생 루틴\n\n[Slide 1: 메인 표지]\n- 디자인: 중앙 집중형 타이포그래피, 배경에 고화질 ${topic} 관련 감성 이미지. 하단에 '넘겨보기' 화살표.\n- 헤드라인: "아직도 ${topic} 모르는 사람 없게 해주세요!"\n- 본문: 2024년 건강 트렌드의 중심, ${topic}! 왜 다들 열광하는지 지금 바로 확인하세요.\n- 이미지 프롬프트: Minimalist and aesthetic photography of ${topic}, soft sunlight through a window, high-end lifestyle vibe, 4k.\n\n[Slide 2: 문제 제기]\n- 디자인: 어두운 톤의 배경, 텍스트에 네온 하이라이트 효과. 긴장감 조성.\n- 헤드라인: "자도 자도 피곤한 이유, 혹시?"\n- 본문: 원인은 바로 ${topic} 부족일 수 있습니다. 당신의 몸이 보내는 위험 신호를 더 이상 무시하지 마세요.\n- 이미지 프롬프트: Moody and cinematic shot of a tired person in a modern office, dramatic lighting, blue tones.\n\n[Slide 3: 해결책 제시]\n- 디자인: 밝고 화사한 톤으로 급반전, 긍정적인 에너지와 희망 강조.\n- 헤드라인: "정답은 ${topic}에 있습니다."\n- 본문: 뇌 과학이 증명하고 전문가가 추천하는 가장 확실한 변화의 시작. ${topic} 하나로 인생이 바뀝니다.\n- 이미지 프롬프트: Bright and airy photography of fresh organic ingredients related to ${topic}, macro shot, vibrant colors.\n\n[Slide 4: 핵심 효능 1 - 뇌 건강]\n- 디자인: 인포그래픽 요소 가미, 큰 숫자로 가독성 확보. 신경망 그래픽 배경.\n- 헤드라인: "1. 뇌 세포의 부활"\n- 본문: 신경 가소성을 자극하여 인지 기능을 극대화합니다. 업무 효율이 200% 상승하는 놀라운 경험을 해보세요!\n- 이미지 프롬프트: Abstract neural network illustration, glowing lines, deep blue and gold colors, digital art.\n\n[Slide 5: 핵심 효능 2 - 에너지]\n- 디자인: 활기찬 오렌지 컬러 포인트. 번개 아이콘 활용.\n- 헤드라인: "2. 무한 동력 에너지"\n- 본문: 미토콘드리아 활성화를 통해 만성 피로를 타파합니다. 오후 3시의 무력감은 이제 당신의 이야기가 아닙니다.\n- 이미지 프롬프트: Conceptual photography of energy burst, vibrant colors, dynamic composition, abstract light trails.\n\n[Slide 6: 실천 방법 1단계]\n- 디자인: 깔끔한 체크리스트 스타일의 레이아웃. 파스텔 톤.\n- 헤드라인: "STEP 1. 아침 루틴의 변화"\n- 본문: 기상 직후 딱 5분, ${topic}을 위한 작은 습관이 하루 전체의 컨디션을 결정합니다. 지금 바로 시작 가능한 루틴!\n- 이미지 프롬프트: Peaceful morning scene, a cup of tea and a notebook on a wooden table, soft window light.\n\n[Slide 7: 실천 방법 2단계]\n- 디자인: 실천적인 느낌의 사진 배경. 따뜻한 감성.\n- 헤드라인: "STEP 2. 꾸준함의 미학"\n- 본문: 거창한 계획보다 중요한 건 매일의 실천입니다. 작게 시작해서 크게 키워가세요. 당신의 노력을 기록하세요.\n- 이미지 프롬프트: Close-up of a person writing in a beautiful planner, aesthetic stationery, warm tones, cozy atmosphere.\n\n[Slide 8: 주의사항]\n- 디자인: 경고의 의미를 담은 부드러운 파스텔 레드 톤. 느낌표 아이콘.\n- 헤드라인: "이것만은 주의하세요!"\n- 본문: 과유불급! 자신의 체질에 맞는 적정량을 지키는 것이 중요합니다. 남들이 좋다고 무작정 따라 하는 건 금물.\n- 이미지 프롬프트: Minimalist balance scale illustration, zen aesthetic, neutral colors, symbolic representation.\n\n[Slide 9: 최종 요약]\n- 디자인: 한눈에 들어오는 요약 박스 구성. 강조 컬러 사용.\n- 헤드라인: "오늘의 핵심 요약"\n- 본문: 1. 뇌 건강 / 2. 에너지 충전 / 3. 매일 5분 실천. 이 세 가지만 기억하면 당신도 ${topic} 마스터!\n- 이미지 프롬프트: Clean and simple flat lay of ${topic} related items, organized and aesthetic, top view.\n\n[Slide 10: 아웃트로 & CTA]\n- 디자인: 브랜드 로고와 팔로우 버튼 강조. 하트와 저장 아이콘 애니메이션 느낌.\n- 헤드라인: "더 많은 꿀팁이 궁금하다면?"\n- 본문: 팔로우하고 매일 새로운 ${topic} 정보를 받아보세요! 저장하고 나중에 다시 보기, 친구에게 공유하기 필수!\n- 이미지 프롬프트: Aesthetic 'Follow' button design, soft background blur, inviting and friendly atmosphere.`,
    metaTitle: `인스타 카드뉴스: ${topic} 마스터`,
    metaDesc: `10장의 슬라이드로 구성된 ${topic} 전문 카드뉴스입니다. 디자인 지시어와 프롬프트 포함.`,
    imagePrompt: `Trendy and aesthetic Instagram carousel slide collection for ${topic}, professional graphic design, high-quality photography.`
  }
});

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: Channel, 
  active: boolean, 
  onClick: () => void,
  key?: any
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-3 px-6 transition-all duration-200 relative group ${
      active 
        ? 'text-primary bg-primary/5 dark:bg-primary/10 border-r-4 border-primary' 
        : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50'
    }`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const CircularGauge = ({ score }: { score: number }) => {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="stroke-stone-200 dark:stroke-slate-800"
          cx="96"
          cy="96"
          fill="transparent"
          r={radius}
          strokeWidth="12"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-primary-container"
          cx="96"
          cy="96"
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter">{score}</span>
        <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full mt-1">EXCELLENT</span>
      </div>
    </div>
  );
};

export default function App() {
  const [activeChannel, setActiveChannel] = useState<Channel>('전문가 칼럼');
  const [activeView, setActiveView] = useState<View>('analysis');
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topicInput, setTopicInput] = useState('시니어 건강');
  const [contentData, setContentData] = useState(getInitialContent('시니어 건강'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('성공적으로 복사되었습니다!');

  const [history] = useState<HistoryItem[]>([
    { id: '1', topic: '시니어 건강', date: '2024-03-20', channels: ['SEO 블로그', '유튜브 쇼츠', '인스타 뉴스'] },
    { id: '2', topic: '비건 디저트', date: '2024-03-18', channels: ['전문가 칼럼', '인포그래픽 기획'] },
    { id: '3', topic: '재테크 기초', date: '2024-03-15', channels: ['티스토리 HTML', '인스타 뉴스'] },
  ]);

  const [library] = useState<LibraryItem[]>([
    { id: '1', title: '시니어 건강의 기적', channel: 'SEO 블로그', date: '2024-03-20' },
    { id: '2', title: '비건 디저트 칼럼', channel: '전문가 칼럼', date: '2024-03-18' },
    { id: '3', title: '인스타 뉴스 3월호', channel: '인스타 뉴스', date: '2024-03-15' },
  ]);

  useEffect(() => {
    console.log('Dark mode toggled:', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGenerate = () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setContentData(getInitialContent(topicInput));
      setIsGenerating(false);
      triggerToast('새로운 콘텐츠 패키지가 생성되었습니다!');
    }, 2000);
  };

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      triggerToast('성공적으로 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);

  const keywords = [
    { keyword: `${topicInput} 효능`, volume: '42,500', competition: 45, recommendation: '상' },
    { keyword: `${topicInput} 관리법`, volume: '12,800', competition: 80, recommendation: '중' },
    { keyword: `${topicInput} 추천`, volume: '5,200', competition: 20, recommendation: '최상' },
  ];

  const channels: { label: Channel, icon: any }[] = [
    { label: '전문가 칼럼', icon: PenTool },
    { label: 'SEO 블로그', icon: FileText },
    { label: '티스토리 HTML', icon: LayoutDashboard },
    { label: '인포그래픽 기획', icon: BarChart3 },
    { label: '인스타 뉴스', icon: Instagram },
    { label: '유튜브 쇼츠', icon: Youtube },
  ];

  const currentContent = contentData[activeChannel];

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''} bg-[#F8F5F2] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      
      {/* --- Toast Notification --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-on-surface dark:bg-stone-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <CheckCircle2 className="text-primary-container" size={18} />
            <span className="text-sm font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Sidebar --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10 cursor-pointer" onClick={() => setActiveView('analysis')}>
            <h1 className="text-2xl font-black text-primary dark:text-primary-container font-headline">ContentFlow Pro</h1>
            <p className="text-xs font-medium text-stone-500 mt-1">콘텐츠 생성 대시보드</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest px-2">주제 입력</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="예: 비건 견과류 디저트"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 caramel-ribbon text-white rounded-full font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={18} /> : null}
              {isGenerating ? '생성 중...' : '6종 패키지 생성'}
            </button>
          </div>

          <nav className="flex-1 -mx-8 overflow-y-auto">
            {channels.map((ch) => (
              <SidebarItem 
                key={ch.label}
                icon={ch.icon}
                label={ch.label}
                active={activeChannel === ch.label && activeView === 'analysis'}
                onClick={() => {
                  setActiveChannel(ch.label);
                  setActiveView('analysis');
                  setIsSidebarOpen(false);
                }}
              />
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <div 
              onClick={() => triggerToast('프리미엄 구독 페이지로 이동합니다.')}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Sparkles size={64} className="text-primary" />
              </div>
              <p className="text-[10px] font-bold text-primary-container mb-1 uppercase">Premium Benefits</p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                무제한 생성 기능을<br/>지금 바로 체험해보세요.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        
        {/* Topbar */}
        <header className="flex justify-between items-center px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-stone-600 dark:text-stone-400"
            >
              <Menu size={24} />
            </button>
            <nav className="hidden md:flex gap-8 font-headline font-semibold text-sm">
              <button 
                onClick={() => setActiveView('analysis')}
                className={`${activeView === 'analysis' ? 'text-primary border-b-2 border-primary' : 'text-stone-500'} pb-1 transition-all`}
              >
                분석
              </button>
              <button 
                onClick={() => setActiveView('history')}
                className={`${activeView === 'history' ? 'text-primary border-b-2 border-primary' : 'text-stone-500'} pb-1 transition-all`}
              >
                히스토리
              </button>
              <button 
                onClick={() => setActiveView('library')}
                className={`${activeView === 'library' ? 'text-primary border-b-2 border-primary' : 'text-stone-500'} pb-1 transition-all`}
              >
                라이브러리
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-stone-600" />}
            </button>
            <button 
              onClick={() => setIsGuideModalOpen(true)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-900 dark:text-slate-100"
            >
              <HelpCircle size={14} />
              사용 방법
            </button>
            <div 
              onClick={() => triggerToast('프로필 설정으로 이동합니다.')}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer hover:scale-110 transition-all"
            >
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="Profile" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          <AnimatePresence mode="wait">
            {activeView === 'analysis' && (
              <motion.div 
                key="analysis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Stats Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* SEO Gauge */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest self-start mb-6">종합 SEO 점수</p>
                    <CircularGauge score={88} />
                  </div>

                  {/* Keyword Table */}
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">키워드 분석 리포트</p>
                        <h2 className="text-2xl font-bold font-headline text-slate-900 dark:text-slate-100">시장 트렌드 최적화</h2>
                      </div>
                      <TrendingUp className="text-primary-container" size={28} />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] font-bold text-stone-500 uppercase tracking-widest border-b border-outline-variant/20">
                            <th className="py-4">키워드</th>
                            <th className="py-4">월간 검색량</th>
                            <th className="py-4">경쟁 강도</th>
                            <th className="py-4">추천도</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {keywords.map((kw, i) => (
                            <tr key={i} className="border-b border-outline-variant/10 hover:bg-white/20 transition-all">
                              <td className="py-4 font-bold">{kw.keyword}</td>
                              <td className="py-4 text-stone-600 dark:text-stone-400">{kw.volume}</td>
                              <td className="py-4">
                                <div className="w-24 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${kw.competition}%` }}></div>
                                </div>
                              </td>
                              <td className="py-4 text-primary font-black">{kw.recommendation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Content & Workspace Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  
                  {/* Main Content Area */}
                  <div className="xl:col-span-8 space-y-6">
                    <motion.div 
                      key={activeChannel}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[600px] relative"
                    >
                      {isGenerating && (
                        <div className="absolute inset-0 bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-[2.5rem]">
                          <div className="flex flex-col items-center gap-4">
                            <Loader2 className="animate-spin text-primary" size={48} />
                            <p className="font-bold text-primary">AI가 콘텐츠를 생성 중입니다...</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            {(() => {
                              const ActiveIcon = channels.find(c => c.label === activeChannel)?.icon || FileText;
                              return <ActiveIcon size={24} />;
                            })()}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-headline">{activeChannel} 초안 생성</h3>
                            <p className="text-xs text-stone-500">HSO 구조를 기반으로 한 고관여 콘텐츠</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="p-2 text-stone-400 hover:text-primary transition-colors"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>

                      <div className="space-y-12">
                        {/* HOOK */}
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 bottom-0 w-1 caramel-ribbon rounded-full"></div>
                          <span className="text-[10px] font-black text-primary tracking-widest block mb-2 uppercase">[HOOK]</span>
                          <h4 className="text-2xl font-bold leading-tight mb-4 font-headline">
                            {currentContent.hook}
                          </h4>
                        </div>

                        {/* STORY */}
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-stone-200 dark:bg-stone-700 rounded-full"></div>
                          <span className="text-[10px] font-black text-stone-400 tracking-widest block mb-2 uppercase">[STORY]</span>
                          <p className="text-on-surface-variant leading-relaxed">
                            {currentContent.story}
                          </p>
                        </div>

                        {/* OFFER */}
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 bottom-0 w-1 caramel-ribbon rounded-full"></div>
                          <span className="text-[10px] font-black text-primary tracking-widest block mb-2 uppercase">[OFFER]</span>
                          <p className="text-on-surface-variant leading-relaxed mb-8">
                            {currentContent.offer}
                          </p>
                          <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-on-surface dark:bg-primary-container text-surface dark:text-on-primary-container rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all"
                          >
                            전체 원고 보기 <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Side Panel */}
                  <div className="xl:col-span-4 space-y-6">
                    {/* Metadata Engine */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-xs tracking-tight uppercase text-slate-900 dark:text-slate-100">Metadata Engine</h4>
                        <Settings size={16} className="text-primary" />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">Meta Title</label>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs leading-relaxed font-medium border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                            {currentContent.metaTitle}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-500 uppercase">Meta Description</label>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs leading-relaxed font-medium border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                            {currentContent.metaDesc}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Channel Distribution */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-slate-800 rounded-[2.5rem] p-8">
                      <h4 className="font-bold text-xs tracking-tight uppercase mb-6">Channel Distribution</h4>
                      <div className="space-y-3">
                        <div 
                          onClick={() => {
                            setActiveChannel('전문가 칼럼');
                            triggerToast('전문가 칼럼 채널로 이동했습니다.');
                          }}
                          className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-900/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <PenTool size={18} className="text-primary" />
                            <span className="text-xs font-bold">Expert Column</span>
                          </div>
                          <ExternalLink size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <div 
                          onClick={() => {
                            setActiveChannel('SEO 블로그');
                            triggerToast('SEO 블로그 채널로 이동했습니다.');
                          }}
                          className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-900/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-primary" />
                            <span className="text-xs font-bold">SEO Blog</span>
                          </div>
                          <ExternalLink size={14} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </div>
                    </div>

                    {/* AI Image Guide Card */}
                    <div 
                      onClick={() => handleCopy(currentContent.imagePrompt)}
                      className="bg-primary-container text-white rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer shadow-xl"
                    >
                      <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <Sparkles size={32} className="mb-4" />
                        <h3 className="text-xl font-bold mb-2 leading-tight font-headline">AI 이미지 생성 가이드</h3>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-6 border border-white/10">
                          <p className="text-[10px] font-mono opacity-90 leading-relaxed italic">
                            "{currentContent.imagePrompt}"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                          EXPLORE NOW <ArrowRight size={14} />
                        </div>
                      </div>
                      <img 
                        src={`https://picsum.photos/seed/${topicInput}/300/300`} 
                        alt="Abstract" 
                        referrerPolicy="no-referrer"
                        className="absolute right-[-10%] bottom-[-10%] w-40 opacity-20 group-hover:rotate-12 transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'history' && (
              <motion.div 
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold font-headline">생성 히스토리</h2>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                    <Search size={16} className="text-stone-400" />
                    <input type="text" placeholder="검색..." className="bg-transparent border-none outline-none text-xs w-32" />
                  </div>
                </div>
                <div className="grid gap-4">
                  {history.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setTopicInput(item.topic);
                        setContentData(getInitialContent(item.topic));
                        setActiveView('analysis');
                        triggerToast(`${item.topic} 데이터를 로드했습니다.`);
                      }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-primary transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-stone-500">
                          <Clock size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{item.topic}</h4>
                          <div className="flex gap-2 mt-1">
                            {item.channels.map((ch, i) => (
                              <span key={i} className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold">{ch}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-stone-400">{item.date}</span>
                        <ChevronRight className="text-stone-300 group-hover:text-primary transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'library' && (
              <motion.div 
                key="library"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold font-headline">콘텐츠 라이브러리</h2>
                  <button 
                    onClick={() => triggerToast('새 폴더 생성 기능을 준비 중입니다.')}
                    className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    새 폴더
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {library.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Bookmark size={20} />
                        </div>
                        <button className="text-stone-300 hover:text-primary transition-colors">
                          <Maximize2 size={16} />
                        </button>
                      </div>
                      <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-slate-100">{item.title}</h4>
                      <p className="text-xs text-stone-500 mb-4">{item.channel} • {item.date}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerToast('라이브러리에서 복사되었습니다.');
                          }}
                          className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-bold hover:bg-primary hover:text-white transition-all text-slate-900 dark:text-slate-100"
                        >
                          복사
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerToast('공유 링크가 생성되었습니다.');
                          }}
                          className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-bold hover:bg-primary hover:text-white transition-all text-slate-900 dark:text-slate-100"
                        >
                          공유
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Resource Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900 dark:bg-slate-800 px-8 py-4 rounded-full shadow-2xl z-30 scale-90 md:scale-100 border border-white/10">
          <span className="text-xs text-white font-bold">생성된 리소스:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all" onClick={() => setActiveChannel('전문가 칼럼')}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
              <span className="text-xs text-stone-300 font-medium">칼럼(1)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all" onClick={() => setActiveChannel('SEO 블로그')}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
              <span className="text-xs text-stone-300 font-medium">블로그(1)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all" onClick={() => setActiveChannel('티스토리 HTML')}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
              <span className="text-xs text-stone-300 font-medium">HTML(1)</span>
            </div>
          </div>
        </div>

      </main>

      {/* --- Detail Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#0f172a] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-full"
            >
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {(() => {
                      const ActiveIcon = channels.find(c => c.label === activeChannel)?.icon || FileText;
                      return <ActiveIcon size={20} />;
                    })()}
                  </div>
                  <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-slate-100">{activeChannel} 상세 원고</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-slate-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="prose dark:prose-invert max-w-none">
                  <h1 className="text-2xl font-bold mb-6 font-headline text-slate-900 dark:text-slate-100">{currentContent.title}</h1>
                  <div className="whitespace-pre-wrap text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {currentContent.fullText}
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-outline-variant/10 flex justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-sm font-bold text-stone-500 hover:text-stone-800 transition-colors dark:text-stone-400 dark:hover:text-stone-200"
                >
                  닫기
                </button>
                <button 
                  onClick={() => handleCopy(currentContent.fullText)}
                  className="px-8 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Copy size={16} />
                  원고 복사하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Guide Modal --- */}
      <AnimatePresence>
        {isGuideModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGuideModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Service Guide</span>
                    <h3 className="text-3xl font-bold font-headline tracking-tight text-slate-900 dark:text-slate-100">글결 Pro 사용 가이드</h3>
                  </div>
                  <button 
                    onClick={() => setIsGuideModalOpen(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-slate-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  {[
                    { step: '01', title: '주제 입력', desc: '상단 입력창에 원하는 콘텐츠 주제(예: 시니어 건강)를 입력하세요.' },
                    { step: '02', title: '6종 패키지 생성', desc: "'생성' 버튼을 눌러 각 채널에 최적화된 6가지 원고를 한 번에 만드세요." },
                    { step: '03', title: '채널별 확인', desc: '왼쪽 사이드바를 눌러 블로그, 쇼츠, 인스타 등 매체별 원고를 확인하세요.' },
                    { step: '04', title: '복사 및 배포', desc: "'전체보기'를 눌러 상세 원고를 확인하고 '복사하기' 버튼으로 간편하게 가져가세요." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-slate-900 dark:text-slate-100">{item.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsGuideModalOpen(false)}
                  className="w-full mt-12 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  가이드 닫고 시작하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
