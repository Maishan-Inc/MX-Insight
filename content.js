const ft=["读取图片","发送至模型","生成提示词"],Le="defaultGeneratorSite",$e="sharedPanelSession",Me="inlinePromptOnboardingComplete",Gi=["baseUrl","apiKey","model"],oi=["jimeng","gemini","midjourney","lovart"],Jt=[220,700,1500,2600,4200,6200,8600],St={jimeng:{id:"jimeng",label:"即梦",shortLabel:"即梦",url:"https://jimeng.jianying.com/",logoUrl:"https://www.google.com/s2/favicons?domain=jimeng.jianying.com&sz=64",badgeText:"即",accentClass:"is-jimeng",matchHost:e=>e==="jimeng.jianying.com"||e.endsWith(".jimeng.jianying.com"),promptSelectors:["textarea","[contenteditable='true'][role='textbox']","[contenteditable='true']","[role='textbox']"],sendSelectors:["button[type='submit']","button[aria-label*='生成']","button[title*='生成']","button[data-testid*='send']"]},gemini:{id:"gemini",label:"Gemini Apps",shortLabel:"Gemini",url:"https://gemini.google.com/app",logoUrl:"https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64",badgeText:"G",accentClass:"is-gemini",matchHost:e=>e==="gemini.google.com",promptSelectors:["rich-textarea [contenteditable='true']","textarea","[contenteditable='true'][aria-label]","[role='textbox']","[contenteditable='true']"],sendSelectors:["button[aria-label*='Send']","button[aria-label*='send']","button[type='submit']","button[data-testid*='send']"]},midjourney:{id:"midjourney",label:"Midjourney Web",shortLabel:"MJ",url:"https://www.midjourney.com/imagine",logoUrl:"https://www.google.com/s2/favicons?domain=midjourney.com&sz=64",badgeText:"MJ",accentClass:"is-midjourney",matchHost:e=>e==="www.midjourney.com"||e==="midjourney.com"||e.endsWith(".midjourney.com"),promptSelectors:["textarea","[contenteditable='true'][role='textbox']","[role='textbox']","[contenteditable='true']"],sendSelectors:["button[type='submit']","button[aria-label*='Imagine']","button[aria-label*='Generate']","button[data-testid*='send']"]},lovart:{id:"lovart",label:"Lovart",shortLabel:"Lovart",url:"https://www.lovart.ai/",logoUrl:"https://www.google.com/s2/favicons?domain=lovart.ai&sz=64",badgeText:"LO",accentClass:"is-lovart",matchHost:e=>e==="www.lovart.ai"||e==="lovart.ai"||e.endsWith(".lovart.ai"),promptSelectors:["textarea","[contenteditable='true'][role='textbox']","[role='textbox']","[contenteditable='true']"],sendSelectors:["button[type='submit']","button[aria-label*='Generate']","button[aria-label*='Create']","button[data-testid*='send']"]}},d={zh:"中",json:"J",analysisImage:"分析图像",analysisResult:"分析结果",apiSetupTitle:"接口设置",apiSetupDescription:"首次使用先在卡片内填写接口地址、接口密钥和模型名称，保存后就会继续分析当前图片。",apiSetupBaseUrl:"接口地址",apiSetupApiKey:"接口密钥",apiSetupModel:"模型名称",apiSetupSave:"保存并开始分析",apiSetupSaving:"保存中...",apiSetupBaseUrlPlaceholder:"例如：https://api.example.com/v1",apiSetupApiKeyPlaceholder:"请输入接口密钥",apiSetupModelPlaceholder:"请输入支持图片分析的模型名称",retry:"重试",openSettings:"打开设置",copy:"复制",copied:"已复制",copyAndOpenPrefix:"复制并打开",openingGenerator:"打开中...",chooseGeneratorSite:"选择生图站点",generatorCopiedToastPrefix:"已复制提示词并打开",generatorFallbackToastSuffix:"，若页面未自动填入，可直接粘贴。",generatorReadyToastSuffix:"已填入提示词，现在点发送即可。",generatorOpenError:"打开生图站点失败，请稍后重试。",openAction:"",promptAction:"反推提示词",promptLoading:"反推中",saveAction:"保存",saveLoading:"保存中",saveDone:"已保存",saveRetry:"重试保存",saveSuccessToast:"已加入反推记录",minimizePanel:"收缩",expandPanel:"展开",inlineActionsTitle:"网页悬浮与分析",inlineActionsOn:"关闭悬浮菜单",inlineActionsOff:"开启悬浮菜单",closeSharedPanel:"关闭插件页面",actionMenuLabel:"图片快捷操作",history:"历史",historyLabel:"历史",deleteHistory:"删除这条历史",closeHistory:"关闭历史",emptyHistory:"还没有历史记录",savingHistory:"分析中",missingLatestAnalysis:"还没有可以直接打开的解析结果，请先右键图片完成一次分析。",missingImage:"没有拿到可分析的图片地址，请右键普通网页图片再试一次。"};let W=document.getElementById("imagetoprompt-root"),Xe=null,u=null,J=null,ue=null,l={status:"hidden",language:"zh",analysis:null,error:"",copied:!1},G={element:null,target:null,point:null},O=null,z=null,w=null,fe=0,y=null,st=null,At={x:0,y:0},Ee=null,jt=!1,si=0,v=12,H=null,ie=null,_t=null,Pe=null,oe="",Q="",ye={},D=!1,U=!1,Te=null,Je=!1,k=[],Se=null,mt=!1,x=!1,xe=!1,je=null,j=[],E=null,Ct=new Set,kt=null,_=null,me=0,se=null,Ae=null,q=null,N=null,be=null,B=!1,Be=null,ne=null,re=null,qe="",Zt=0,K=!0,C=!0,h="hidden",le="jimeng",lt=!1,_e=!1,Z=!1,ae="idle",li=0,pe=null,Ve=null,Ie=[],He=null,A=null,b={baseUrl:"",apiKey:"",model:"",error:"",isSaving:!1},Ze=null;const ci=new Map,Ui=`
  :host {
    all: initial;
    position: fixed !important;
    inset: 0 !important;
    width: var(--imagetoprompt-vw, 100vw) !important;
    height: var(--imagetoprompt-vh, 100vh) !important;
    display: block !important;
    overflow: visible !important;
    z-index: 2147483646 !important;
    pointer-events: none !important;
    font-size: 16px !important;
    line-height: normal !important;
    direction: ltr !important;
    unicode-bidi: isolate !important;
    transform: none !important;
    zoom: 1 !important;
    contain: layout style size !important;
  }

  .overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2147483646;
    font-family: "SF Pro Display", "SF Pro Text", "Segoe UI Variable", sans-serif;
  }

  .image-action-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .image-action-toast-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    font-family: "SF Pro Display", "SF Pro Text", "Segoe UI Variable", sans-serif;
  }

  .image-action-menu {
    --image-action-scale: 1;
    position: fixed;
    min-width: calc(74px * var(--image-action-scale));
    display: inline-flex;
    flex-direction: column;
    gap: calc(5px * var(--image-action-scale));
    padding: calc(5px * var(--image-action-scale));
    border-radius: calc(16px * var(--image-action-scale));
    border: 1px solid rgba(236, 243, 255, 0.22);
    background:
      linear-gradient(180deg, rgba(26, 29, 36, 0.76), rgba(9, 12, 18, 0.62)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
    box-shadow:
      0 16px 32px rgba(0, 0, 0, 0.22),
      0 8px 18px rgba(0, 0, 0, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(20px) saturate(1.05);
    -webkit-backdrop-filter: blur(20px) saturate(1.05);
    pointer-events: auto;
    transform-origin: top right;
    animation: imageActionMenuIn 0.18s cubic-bezier(0.22, 0.82, 0.2, 1) both;
  }

  .image-action-button {
    all: unset;
    min-width: calc(64px * var(--image-action-scale));
    height: calc(28px * var(--image-action-scale));
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 calc(10px * var(--image-action-scale));
    border-radius: 999px;
    border: 1px solid rgba(240, 246, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03)),
      rgba(255, 255, 255, 0.02);
    color: rgba(23, 32, 51, 0.96);
    font-size: calc(11px * var(--image-action-scale));
    font-weight: 580;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      background 0.18s ease,
      color 0.18s ease,
      opacity 0.18s ease;
  }

  .image-action-button:hover {
    transform: translateY(-1px) scale(1.01);
    border-color: rgba(248, 251, 255, 0.24);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05)),
      rgba(255, 255, 255, 0.03);
  }

  .image-action-button:focus,
  .image-action-button:focus-visible,
  .image-action-button:active {
    outline: none;
  }

  .image-action-button.is-disabled {
    opacity: 0.68;
    cursor: progress;
    transform: none;
  }

  .image-action-button.is-success {
    border-color: rgba(214, 255, 230, 0.24);
    background:
      linear-gradient(180deg, rgba(169, 255, 205, 0.14), rgba(105, 220, 155, 0.06)),
      rgba(114, 235, 168, 0.08);
    color: rgba(235, 255, 242, 0.98);
  }

  .image-action-button.is-error {
    border-color: rgba(255, 217, 217, 0.24);
    background:
      linear-gradient(180deg, rgba(255, 177, 177, 0.14), rgba(255, 127, 127, 0.06)),
      rgba(255, 133, 133, 0.08);
  }

  .image-action-menu .image-action-button:not(:first-child) {
    display: none !important;
  }

  .image-action-toast {
    position: fixed;
    right: 18px;
    bottom: 18px;
    max-width: min(320px, calc(var(--imagetoprompt-vw, 100vw) - 28px));
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(239, 246, 255, 0.18);
    background:
      linear-gradient(180deg, rgba(28, 31, 39, 0.84), rgba(10, 13, 20, 0.72)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
    color: rgba(247, 250, 255, 0.96);
    font-size: 12px;
    line-height: 1.5;
    pointer-events: none;
    animation: imageActionToastIn 0.22s cubic-bezier(0.22, 0.82, 0.2, 1) both;
  }

  .image-action-toast.is-error {
    border-color: rgba(255, 205, 205, 0.22);
    color: rgba(255, 240, 240, 0.96);
  }

  .task-complete-toast {
    position: fixed;
    left: 16px;
    top: 16px;
    width: min(280px, calc(var(--imagetoprompt-vw, 100vw) - 32px));
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 14px;
    border: 1px solid rgba(239, 246, 255, 0.2);
    background:
      linear-gradient(180deg, rgba(28, 31, 39, 0.9), rgba(10, 13, 20, 0.78)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
    color: rgba(247, 250, 255, 0.96);
    font-size: 12px;
    line-height: 1.4;
    pointer-events: none;
    animation: taskCompleteToastIn 0.28s cubic-bezier(0.22, 0.82, 0.2, 1) both;
  }

  .task-complete-toast img {
    width: 52px;
    height: 52px;
    object-fit: cover;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
  }

  .task-complete-toast strong,
  .task-complete-toast span {
    min-width: 0;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history-button,
  .history-rail,
  .history-flyover {
    display: none !important;
  }

  @keyframes taskCompleteToastIn {
    from {
      opacity: 0;
      transform: translate3d(-112%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .panel-shell {
    position: fixed;
    display: inline-flex;
    width: max-content;
    max-width: calc(var(--imagetoprompt-vw, 100vw) - 24px);
    align-items: flex-start;
    gap: 12px;
    pointer-events: none;
  }

  .panel {
    position: relative;
    --panel-ui-scale: 1;
    width: min(350px, calc(var(--imagetoprompt-vw, 100vw) - 24px));
    min-width: min(350px, calc(var(--imagetoprompt-vw, 100vw) - 24px));
    flex: 0 0 auto;
    max-height: min(82vh, 680px);
    display: flex;
    overflow: visible;
    isolation: isolate;
    pointer-events: auto;
    color: rgba(247, 250, 255, 0.96);
    border-radius: calc(30px * var(--panel-ui-scale));
    border: 1px solid rgba(241, 247, 255, 0.24);
    background:
      linear-gradient(180deg, rgba(20, 23, 30, 0.52), rgba(3, 5, 10, 0.56)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.035));
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.26),
      0 10px 24px rgba(0, 0, 0, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.38),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(28px) saturate(1.06);
    -webkit-backdrop-filter: blur(28px) saturate(1.06);
  }

  .panel.dragging {
    transition: none !important;
    user-select: none;
    -webkit-user-select: none;
  }

  .panel.is-minimized {
    width: auto;
    min-width: 0;
    max-width: calc(var(--imagetoprompt-vw, 100vw) - 24px);
  }

  .panel::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(29px * var(--panel-ui-scale));
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.02) 24%, transparent 38%);
    pointer-events: none;
  }

  .panel::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.018) 0,
        rgba(255, 255, 255, 0.018) 1px,
        transparent 1px,
        transparent 3px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.012) 0,
        rgba(255, 255, 255, 0.012) 1px,
        transparent 1px,
        transparent 4px
      );
    opacity: 0.24;
    pointer-events: none;
  }

  .panel.dragging .header {
    cursor: grabbing;
  }

  .ring-glow {
    position: absolute;
    inset: -10px;
    padding: 2px;
    border-radius: 38px;
    pointer-events: none;
    opacity: 0;
    z-index: 0;
    background:
      conic-gradient(
        from 180deg,
        transparent 0deg,
        transparent 52deg,
        rgba(255, 255, 255, 0.05) 74deg,
        rgba(255, 255, 255, 0.78) 92deg,
        rgba(255, 255, 255, 0.22) 108deg,
        transparent 138deg,
        transparent 360deg
      );
    filter: blur(9px);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
  }

  .ring-glow::before {
    content: "";
    position: absolute;
    inset: 9px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    opacity: 0.65;
  }

  .panel.loading-glow .ring-glow {
    opacity: 0.92;
    animation: borderOrbit 2.2s linear infinite;
  }

  .panel.copy-glow .ring-glow {
    opacity: 1;
    animation: borderOrbitBurst 1.05s cubic-bezier(0.2, 0.78, 0.18, 1) both;
  }

  .glass-pill {
    display: none;
  }

  .panel-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
    max-height: min(82vh, 680px);
    padding: 22px;
  }

  .header {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: calc(12px * var(--panel-ui-scale));
    margin-bottom: calc(8px * var(--panel-ui-scale));
    min-height: calc(96px * var(--panel-ui-scale));
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .header.is-loading {
    min-height: calc(82px * var(--panel-ui-scale));
    margin-bottom: calc(6px * var(--panel-ui-scale));
  }

  .header.is-loading .header-copy {
    padding-right: calc(44px * var(--panel-ui-scale));
  }

  .header-copy {
    flex: 1 1 auto;
    min-width: 0;
    padding-top: 0;
    padding-right: calc(92px * var(--panel-ui-scale));
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: calc(16px * var(--panel-ui-scale));
  }

  .title-controls {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    margin-top: calc(8px * var(--panel-ui-scale));
    margin-left: calc(-4px * var(--panel-ui-scale));
  }

  .header-actions {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: calc(10px * var(--panel-ui-scale));
    flex-shrink: 0;
  }

  .eyebrow {
    font-size: calc(12px * var(--panel-ui-scale));
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(240, 247, 255, 0.74);
  }

  .title {
    font-size: calc(25px * var(--panel-ui-scale));
    font-weight: 680;
    letter-spacing: -0.03em;
    line-height: 1.04;
  }

  .close-button {
    width: calc(36px * var(--panel-ui-scale));
    height: calc(36px * var(--panel-ui-scale));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(238, 244, 255, 0.12);
    border-radius: calc(12px * var(--panel-ui-scale));
    color: rgba(248, 251, 255, 0.92);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: none;
    cursor: pointer;
    flex-shrink: 0;
    font-size: calc(16px * var(--panel-ui-scale));
    line-height: 1;
    text-shadow: none;
  }

  .close-button svg,
  .minimized-icon-button svg {
    width: 15px;
    height: 15px;
    display: block;
    flex-shrink: 0;
    pointer-events: none;
  }

  .close-button:hover {
    color: rgba(255, 255, 255, 0.98);
    border-color: rgba(238, 244, 255, 0.22);
    background: rgba(255, 255, 255, 0.1);
  }

  .minimized-panel {
    box-sizing: border-box;
    width: 296px;
    min-width: 296px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    cursor: grab;
  }

  .minimized-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .minimized-icon-button {
    all: unset;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 12px;
    border: 1px solid rgba(238, 244, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(248, 251, 255, 0.92);
    cursor: pointer;
    font-size: 15px;
    line-height: 1;
    text-align: center;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .minimized-icon-button:hover {
    transform: translateY(-1px);
    border-color: rgba(238, 244, 255, 0.22);
    background: rgba(255, 255, 255, 0.1);
  }

  .minimized-icon-button.is-danger {
    color: rgba(255, 132, 132, 0.98);
    border-color: rgba(255, 110, 110, 0.24);
    background:
      linear-gradient(180deg, rgba(255, 83, 83, 0.16), rgba(255, 83, 83, 0.08)),
      rgba(255, 255, 255, 0.05);
  }

  .minimized-icon-button.is-danger:hover {
    border-color: rgba(255, 120, 120, 0.34);
    background:
      linear-gradient(180deg, rgba(255, 83, 83, 0.22), rgba(255, 83, 83, 0.12)),
      rgba(255, 255, 255, 0.06);
  }

  .minimized-icon-button.is-expand {
    border-color: rgba(238, 244, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: none;
  }

  .minimized-icon-button.is-expand:hover {
    border-color: rgba(238, 244, 255, 0.22);
    background: rgba(255, 255, 255, 0.1);
  }

  .minimized-toggle-card {
    all: unset;
    box-sizing: border-box;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px 8px 12px;
    border-radius: 16px;
    border: 1px solid rgba(238, 244, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04)),
      rgba(255, 255, 255, 0.04);
    color: rgba(247, 250, 255, 0.94);
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .minimized-toggle-card:hover {
    transform: translateY(-1px);
    border-color: rgba(238, 244, 255, 0.2);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.05)),
      rgba(255, 255, 255, 0.05);
  }

  .minimized-toggle-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .minimized-toggle-title {
    font-size: 11px;
    font-weight: 650;
    line-height: 1.25;
    color: rgba(249, 251, 255, 0.96);
  }

  .minimized-toggle-switch {
    position: relative;
    width: 42px;
    min-width: 42px;
    height: 24px;
    border-radius: 999px;
    border: 1px solid rgba(236, 244, 255, 0.12);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .minimized-toggle-switch::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.96);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transition: transform 0.2s ease;
  }

  .minimized-toggle-card.is-active .minimized-toggle-switch {
    border-color: rgba(111, 231, 150, 0.42);
    background: linear-gradient(180deg, rgba(63, 182, 103, 0.96), rgba(42, 154, 84, 0.9));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 0 1px rgba(73, 198, 117, 0.08),
      0 10px 18px rgba(26, 108, 59, 0.18);
  }

  .minimized-toggle-card.is-active .minimized-toggle-switch::before {
    transform: translateX(18px);
  }

  .body {
    position: relative;
    display: grid;
    gap: calc(12px * var(--panel-ui-scale));
    flex: 1;
    min-height: 0;
    min-width: 0;
    overflow: auto;
    padding-right: 0;
    overscroll-behavior: contain;
  }

  .body-success {
    grid-template-rows: minmax(0, 1fr) auto;
    overflow: hidden;
  }

  .panel.result-enter {
    animation: panelWindowExpand 0.76s cubic-bezier(0.22, 0.82, 0.18, 1.02) both;
    transform-origin: center top;
    will-change: transform, clip-path, opacity;
  }

  .body.result-enter {
    animation: resultReveal 0.58s cubic-bezier(0.22, 0.82, 0.2, 1) both;
    animation-delay: 0.14s;
    transform-origin: top center;
  }

  .body::-webkit-scrollbar {
    width: 6px;
  }

  .body::-webkit-scrollbar-thumb {
    background: rgba(231, 241, 255, 0.24);
    border-radius: 999px;
  }

  .scroll-area {
    min-width: 0;
    min-height: 0;
    overflow: auto;
    padding-right: calc(6px * var(--panel-ui-scale));
    overscroll-behavior: contain;
  }

  .scroll-area.json-scroll {
    overflow: auto;
    max-height: min(38vh, 300px);
    padding-right: calc(6px * var(--panel-ui-scale));
  }

  .scroll-area::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-area::-webkit-scrollbar-thumb {
    background: rgba(231, 241, 255, 0.24);
    border-radius: 999px;
  }

  .scroll-area.json-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-area.json-scroll::-webkit-scrollbar-thumb {
    background: rgba(231, 241, 255, 0.24);
    border-radius: 999px;
  }

  .analysis {
    margin: 0 0 calc(10px * var(--panel-ui-scale));
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1.7;
    color: rgba(246, 250, 255, 0.92);
  }

  .prompt {
    margin: 0;
    padding: 0;
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1.78;
    white-space: pre-wrap;
    border-radius: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: rgba(248, 251, 255, 0.97);
  }

  .prompt-editor {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: rgba(248, 251, 255, 0.97);
    font: inherit;
    letter-spacing: inherit;
    text-align: left;
    caret-color: rgba(255, 255, 255, 0.95);
  }

  .prompt-editor.json-view {
    overflow: auto;
    padding-right: calc(6px * var(--panel-ui-scale));
    line-height: 1.62;
  }

  .prompt-editor.json-view::-webkit-scrollbar {
    display: block;
    width: 6px;
  }

  .prompt-editor.json-view::-webkit-scrollbar-thumb {
    background: rgba(231, 241, 255, 0.24);
    border-radius: 999px;
  }

  .prompt-editor::-webkit-resizer {
    display: none;
  }

  .prompt-editor::-webkit-scrollbar {
    display: none;
  }

  .prompt.typing {
    animation: promptReveal 0.42s cubic-bezier(0.22, 0.78, 0.2, 1) both;
    transform-origin: left center;
    will-change: opacity, filter, clip-path, transform;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: calc(8px * var(--panel-ui-scale));
  }

  .success-meta {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: calc(12px * var(--panel-ui-scale));
  }

  .history-button {
    all: unset;
    box-sizing: border-box;
    width: calc(42px * var(--panel-ui-scale));
    min-width: calc(42px * var(--panel-ui-scale));
    height: calc(42px * var(--panel-ui-scale));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(14px * var(--panel-ui-scale));
    border: 1px solid transparent;
    background: transparent;
    box-shadow: none;
    color: rgba(246, 250, 255, 0.94);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .history-button:hover {
    transform: translateY(-1px);
    border-color: rgba(236, 244, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
  }

  .history-button:focus,
  .history-button:focus-visible,
  .history-button:active {
    transform: none;
    outline: none;
  }

  .history-button.is-disabled {
    opacity: 0.62;
    cursor: progress;
    transform: none;
  }

  .history-button.is-active {
    border-color: rgba(236, 244, 255, 0.16);
    background: rgba(255, 255, 255, 0.08);
  }

  .history-button-icon {
    width: calc(30px * var(--panel-ui-scale));
    height: calc(30px * var(--panel-ui-scale));
    color: rgba(244, 249, 255, 0.94);
    opacity: 0.94;
  }

  .history-button-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .tag {
    padding: calc(7px * var(--panel-ui-scale)) calc(11px * var(--panel-ui-scale));
    border-radius: 999px;
    font-size: calc(11px * var(--panel-ui-scale));
    background: rgba(255, 255, 255, 0.07);
    color: rgba(245, 249, 255, 0.94);
    border: 1px solid rgba(226, 238, 255, 0.12);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .footer {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
    gap: calc(10px * var(--panel-ui-scale));
    margin-top: calc(14px * var(--panel-ui-scale));
    padding-top: calc(14px * var(--panel-ui-scale));
    border-top: 1px solid rgba(226, 238, 255, 0.14);
    flex-shrink: 0;
  }

  .footer .toggle-group {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: calc(48px * var(--panel-ui-scale));
    min-height: calc(48px * var(--panel-ui-scale));
    gap: calc(2px * var(--panel-ui-scale));
    padding: calc(3px * var(--panel-ui-scale));
  }

  .footer .primary-button {
    width: 100%;
    min-width: 0;
    height: calc(48px * var(--panel-ui-scale));
    min-height: calc(48px * var(--panel-ui-scale));
    white-space: nowrap;
  }

  .footer .toggle-option {
    flex: 1 1 0;
    min-width: 0;
    height: calc(42px * var(--panel-ui-scale));
    padding: 0 calc(8px * var(--panel-ui-scale));
    font-size: calc(12px * var(--panel-ui-scale));
  }

  .history-rail {
    position: relative;
    width: 198px;
    flex: 0 0 auto;
    min-height: 180px;
    max-height: min(82vh, 680px);
    display: flex;
    overflow: hidden;
    pointer-events: auto;
    color: rgba(247, 250, 255, 0.96);
    border-radius: 28px;
    border: 1px solid rgba(213, 222, 235, 0.96);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 253, 0.96)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(238, 243, 249, 0.72));
    box-shadow:
      0 22px 46px rgba(15, 23, 42, 0.12),
      0 8px 18px rgba(15, 23, 42, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(214, 224, 236, 0.42);
    backdrop-filter: blur(18px) saturate(1.02);
    -webkit-backdrop-filter: blur(18px) saturate(1.02);
    opacity: 1;
    transform: none;
    transform-origin: left center;
  }

  .history-rail.is-entering {
    opacity: 0;
    transform: translateX(-10px) scale(0.985);
    animation: historyRailIn 0.38s cubic-bezier(0.22, 0.82, 0.2, 1) forwards;
  }

  .history-rail::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 27px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.18) 28%, transparent 44%);
    pointer-events: none;
  }

  .history-rail-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 16px 14px 14px;
  }

  .history-rail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 16px;
    color: rgba(23, 32, 51, 0.9);
  }

  .history-rail-heading {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .history-rail-title {
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .history-rail-count {
    font-size: 11px;
    color: rgba(104, 115, 133, 0.9);
  }

  .history-list {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 12px;
    min-height: 0;
    overflow: auto;
    padding: 4px 4px 0 0;
  }

  .history-list.has-selection .history-item:not(.is-selected) {
    opacity: 0.56;
    filter: saturate(0.84);
  }

  .history-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    min-height: 0;
    padding: 18px 10px;
    text-align: center;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(104, 115, 133, 0.9);
  }

  .history-list::-webkit-scrollbar {
    width: 6px;
  }

  .history-list::-webkit-scrollbar-thumb {
    background: rgba(151, 164, 184, 0.36);
    border-radius: 999px;
  }

  .history-item {
    position: relative;
    align-self: center;
    width: min(100%, 166px);
    opacity: 0.88;
    transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
  }

  .history-item.is-pending {
    opacity: 0.78;
  }

  .history-item.is-selected {
    opacity: 1;
  }

  .history-card-shell {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.18s ease;
  }

  .history-card-shell:hover {
    transform: translateY(-1px);
  }

  .history-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .history-card-face {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: inherit;
    border: 1px solid rgba(203, 213, 225, 0.88);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(244, 247, 251, 0.9)),
      rgba(255, 255, 255, 0.86);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92);
    overflow: hidden;
  }

  .history-item.is-selected .history-card-face {
    border-color: rgba(37, 99, 235, 0.42);
    box-shadow:
      0 0 0 2px rgba(37, 99, 235, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.96);
  }

  .history-card-face.image-face {
    padding: 0;
    align-items: center;
    justify-content: center;
  }

  .history-card-face.image-face.is-placeholder::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.16) 32%, transparent 62%);
    transform: translateX(-120%);
    animation: historyPlaceholderSweep 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  .history-image-thumb {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: inherit;
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.12), transparent 42%),
      rgba(8, 12, 18, 0.22);
  }

  .history-placeholder-badge {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 2;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid rgba(237, 244, 255, 0.16);
    background:
      linear-gradient(180deg, rgba(20, 23, 30, 0.72), rgba(3, 5, 10, 0.62)),
      rgba(255, 255, 255, 0.04);
    color: rgba(248, 251, 255, 0.92);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    pointer-events: none;
  }

  .history-delete-button {
    all: unset;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    border-radius: 0;
    background: transparent;
    border: 0;
    color: rgba(247, 250, 255, 0.88);
    cursor: pointer;
    transition: transform 0.18s ease, color 0.18s ease;
  }

  .history-delete-button:hover {
    transform: scale(1.04);
    color: rgba(255, 255, 255, 0.98);
  }

  .history-delete-button:focus,
  .history-delete-button:focus-visible,
  .history-delete-button:active {
    outline: none;
  }

  .history-close-button {
    all: unset;
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    border-radius: 0;
    border: 0;
    background: transparent;
    color: rgba(247, 250, 255, 0.84);
    cursor: pointer;
    transition: transform 0.18s ease, color 0.18s ease;
  }

  .history-close-button:hover {
    transform: scale(1.04);
    color: rgba(255, 255, 255, 0.98);
  }

  .history-flyover {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    perspective: 1600px;
    z-index: 2147483647;
  }

  .history-flyover-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .history-flyover-face {
    position: absolute;
    inset: 0;
    display: flex;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
    border-radius: 24px;
    border: 1px solid rgba(241, 247, 255, 0.18);
    background:
      linear-gradient(180deg, rgba(20, 23, 30, 0.54), rgba(3, 5, 10, 0.46)),
      linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .history-flyover-face.image-face {
    transform: rotateY(180deg);
  }

  .history-flyover-front-copy {
    margin: 0;
    padding: 18px 18px 20px;
    color: rgba(248, 251, 255, 0.96);
    font-size: 12px;
    line-height: 1.72;
    white-space: pre-wrap;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
  }

  .history-flyover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .footer.result-enter {
    animation: resultReveal 0.6s cubic-bezier(0.22, 0.82, 0.2, 1) both;
    animation-delay: 0.22s;
    transform-origin: top center;
  }

  .toggle-group {
    display: inline-flex;
    align-items: center;
    gap: calc(3px * var(--panel-ui-scale));
    border: 1px solid rgba(226, 238, 255, 0.14);
    padding: calc(3px * var(--panel-ui-scale));
    min-height: calc(32px * var(--panel-ui-scale));
    background: rgba(255, 255, 255, 0.07);
    color: rgba(241, 247, 255, 0.86);
    font-size: calc(11px * var(--panel-ui-scale));
    border-radius: 999px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .toggle-option {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: calc(30px * var(--panel-ui-scale));
    height: calc(24px * var(--panel-ui-scale));
    padding: 0 calc(10px * var(--panel-ui-scale));
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: rgba(241, 247, 255, 0.86);
    font-size: calc(11px * var(--panel-ui-scale));
    cursor: pointer;
    box-sizing: border-box;
  }

  .toggle-option.is-active {
    color: rgba(255, 255, 255, 0.98);
    font-weight: 600;
    background: linear-gradient(180deg, rgba(231, 241, 255, 0.24), rgba(195, 216, 242, 0.14));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 4px 12px rgba(57, 92, 136, 0.12);
  }

  .primary-button,
  .secondary-button {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 999px;
    font-size: calc(13px * var(--panel-ui-scale));
    padding: calc(12px * var(--panel-ui-scale)) calc(18px * var(--panel-ui-scale));
    transition: transform 0.18s ease, opacity 0.18s ease;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .primary-button {
    width: 100%;
    min-width: 0;
    min-height: calc(48px * var(--panel-ui-scale));
    padding-inline: calc(28px * var(--panel-ui-scale));
    color: rgba(14, 18, 24, 0.94);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 244, 248, 0.92));
    border: 1px solid rgba(255, 255, 255, 0.68);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.78),
      inset 0 -1px 0 rgba(198, 206, 216, 0.42),
      0 8px 18px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18px) saturate(1.02);
    -webkit-backdrop-filter: blur(18px) saturate(1.02);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    font-weight: 600;
  }

  .generator-action-group {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: visible;
  }

  .generator-action-row {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: calc(48px * var(--panel-ui-scale));
    border-radius: 999px;
    overflow: hidden;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 12px 20px rgba(0, 0, 0, 0.18);
  }

  .generator-primary-button,
  .generator-site-trigger,
  .generator-site-option {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .generator-primary-button,
  .generator-site-trigger {
    height: calc(48px * var(--panel-ui-scale));
    min-height: calc(48px * var(--panel-ui-scale));
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(16, 18, 24, 0.96), rgba(7, 9, 14, 0.94)),
      rgba(7, 9, 14, 0.96);
    color: rgba(251, 252, 255, 0.96);
    box-shadow: none;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .generator-primary-button:hover,
  .generator-site-trigger:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .generator-primary-button:focus,
  .generator-primary-button:focus-visible,
  .generator-primary-button:active,
  .generator-site-trigger:focus,
  .generator-site-trigger:focus-visible,
  .generator-site-trigger:active {
    outline: none;
    transform: none;
  }

  .generator-primary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(10px * var(--panel-ui-scale));
    flex: 1 1 auto;
    min-width: 0;
    padding: 0 calc(16px * var(--panel-ui-scale));
    border-right: 0;
    border-radius: 999px 0 0 999px;
  }

  .generator-primary-button.is-disabled,
  .generator-site-trigger.is-disabled {
    opacity: 0.74;
    cursor: progress;
    transform: none;
  }

  .generator-button-copy {
    display: inline-flex;
    align-items: center;
    gap: calc(12px * var(--panel-ui-scale));
    min-width: 0;
    width: 100%;
  }

  .generator-button-text {
    min-width: 0;
    font-size: calc(13px * var(--panel-ui-scale));
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .generator-site-trigger {
    width: calc(48px * var(--panel-ui-scale));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 999px 999px 0;
  }

  .generator-site-trigger-icon {
    font-size: calc(15px * var(--panel-ui-scale));
    line-height: 1;
    color: rgba(251, 252, 255, 0.9);
  }

  .generator-site-logo {
    position: relative;
    width: calc(20px * var(--panel-ui-scale));
    height: calc(20px * var(--panel-ui-scale));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(7px * var(--panel-ui-scale));
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.96);
    font-size: calc(9px * var(--panel-ui-scale));
    font-weight: 700;
    letter-spacing: 0.03em;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
    overflow: hidden;
  }

  .generator-site-logo-image {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.06);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .generator-site-logo-fallback {
    position: relative;
    z-index: 1;
  }

  .generator-logo-stream {
    position: relative;
    width: calc(96px * var(--panel-ui-scale));
    height: calc(28px * var(--panel-ui-scale));
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
      rgba(255, 255, 255, 0.025);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
  }

  .generator-logo-stream::before,
  .generator-logo-stream::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(16px * var(--panel-ui-scale));
    z-index: 2;
    pointer-events: none;
  }

  .generator-logo-stream::before {
    left: 0;
    background: linear-gradient(90deg, rgba(7, 9, 14, 0.96), rgba(7, 9, 14, 0));
  }

  .generator-logo-stream::after {
    right: 0;
    background: linear-gradient(270deg, rgba(7, 9, 14, 0.96), rgba(7, 9, 14, 0));
  }

  .generator-logo-track {
    display: inline-flex;
    align-items: center;
    gap: calc(8px * var(--panel-ui-scale));
    width: max-content;
    padding-inline: calc(10px * var(--panel-ui-scale));
    animation: generatorLogoFlow 13s linear infinite;
    will-change: transform;
  }

  .generator-logo-flow-item {
    width: calc(18px * var(--panel-ui-scale));
    height: calc(18px * var(--panel-ui-scale));
    border-radius: calc(6px * var(--panel-ui-scale));
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  }

  .generator-logo-flow-item img {
    display: none;
  }

  .generator-logo-flow-image {
    width: 100%;
    height: 100%;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .generator-site-logo.is-jimeng {
    background: linear-gradient(135deg, rgba(250, 109, 38, 0.96), rgba(255, 149, 82, 0.92));
  }

  .generator-site-logo.is-gemini {
    background: linear-gradient(135deg, rgba(82, 124, 255, 0.96), rgba(126, 92, 255, 0.92));
  }

  .generator-site-logo.is-midjourney {
    background: linear-gradient(135deg, rgba(96, 114, 255, 0.96), rgba(70, 80, 126, 0.92));
  }

  .generator-site-logo.is-lovart {
    background: linear-gradient(135deg, rgba(255, 95, 131, 0.96), rgba(255, 154, 83, 0.92));
  }

  .generator-site-menu {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + calc(10px * var(--panel-ui-scale)));
    padding: calc(8px * var(--panel-ui-scale));
    display: grid;
    gap: calc(6px * var(--panel-ui-scale));
    border-radius: calc(18px * var(--panel-ui-scale));
    border: 1px solid rgba(234, 242, 255, 0.18);
    background:
      linear-gradient(180deg, rgba(22, 25, 33, 0.92), rgba(7, 10, 16, 0.9)),
      rgba(8, 10, 16, 0.92);
    box-shadow:
      0 18px 34px rgba(0, 0, 0, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(22px) saturate(1.04);
    -webkit-backdrop-filter: blur(22px) saturate(1.04);
  }

  .generator-site-option {
    display: flex;
    align-items: center;
    gap: calc(10px * var(--panel-ui-scale));
    min-width: 0;
    padding: calc(10px * var(--panel-ui-scale)) calc(12px * var(--panel-ui-scale));
    border-radius: calc(13px * var(--panel-ui-scale));
    color: rgba(248, 251, 255, 0.94);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid transparent;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .generator-site-option:hover {
    transform: translateY(-1px);
    border-color: rgba(238, 244, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
  }

  .generator-site-option.is-active {
    border-color: rgba(238, 244, 255, 0.16);
    background: rgba(255, 255, 255, 0.08);
  }

  .generator-site-option-copy {
    display: grid;
    gap: calc(2px * var(--panel-ui-scale));
    min-width: 0;
  }

  .generator-site-option-label {
    font-size: calc(12px * var(--panel-ui-scale));
    font-weight: 600;
  }

  .generator-site-option-url {
    font-size: calc(10px * var(--panel-ui-scale));
    color: rgba(228, 237, 252, 0.58);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: calc(8px * var(--panel-ui-scale));
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1;
    color: rgba(20, 26, 34, 0.88);
    animation: checkPop 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .secondary-button {
    color: rgba(245, 249, 255, 0.94);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .secondary-button:hover {
    transform: translateY(-1px);
  }

  .primary-button:hover {
    transform: translateY(-1px);
    outline: none;
    color: rgba(12, 16, 22, 0.96);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 247, 250, 0.94));
    border: 1px solid rgba(255, 255, 255, 0.76);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.84),
      inset 0 -1px 0 rgba(198, 206, 216, 0.46),
      0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .primary-button:active,
  .primary-button:focus,
  .primary-button:focus-visible {
    transform: none;
    outline: none;
    filter: none;
    opacity: 1;
    color: rgba(14, 18, 24, 0.94);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 244, 248, 0.92));
    border: 1px solid rgba(255, 255, 255, 0.68);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.78),
      inset 0 -1px 0 rgba(198, 206, 216, 0.42),
      0 8px 18px rgba(0, 0, 0, 0.1);
  }

  .loading {
    display: grid;
    gap: calc(10px * var(--panel-ui-scale));
    align-items: center;
  }

  .progress-row {
    display: flex;
    align-items: center;
    gap: calc(12px * var(--panel-ui-scale));
  }

  .progress-track {
    position: relative;
    flex: 1;
    height: calc(12px * var(--panel-ui-scale));
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(225, 238, 255, 0.14);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(78, 112, 152, 0.12);
  }

  .progress-bar {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(240, 247, 255, 0.82), rgba(255, 255, 255, 0.98));
    box-shadow:
      0 0 18px rgba(255, 255, 255, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: width 0.35s ease;
  }

  .progress-value {
    min-width: calc(40px * var(--panel-ui-scale));
    text-align: right;
    font-size: calc(12px * var(--panel-ui-scale));
    font-variant-numeric: tabular-nums;
    color: rgba(246, 250, 255, 0.94);
  }

  .loading-status {
    margin: 0;
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1.6;
    color: rgba(244, 248, 255, 0.94);
    animation: loadingPulse 0.9s ease-in-out infinite;
  }

  .error-text {
    margin: 0;
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1.6;
    color: rgba(241, 246, 253, 0.92);
  }

  .helper {
    display: flex;
    gap: calc(8px * var(--panel-ui-scale));
    margin-top: calc(10px * var(--panel-ui-scale));
  }

  .setup-shell {
    display: grid;
    gap: calc(12px * var(--panel-ui-scale));
  }

  .setup-copy {
    margin: 0;
    font-size: calc(13px * var(--panel-ui-scale));
    line-height: 1.65;
    color: rgba(243, 248, 255, 0.9);
  }

  .setup-form {
    display: grid;
    gap: calc(10px * var(--panel-ui-scale));
  }

  .setup-field {
    display: grid;
    gap: calc(5px * var(--panel-ui-scale));
  }

  .setup-label {
    font-size: calc(11px * var(--panel-ui-scale));
    letter-spacing: 0.03em;
    color: rgba(241, 247, 255, 0.76);
  }

  .setup-input {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    height: calc(42px * var(--panel-ui-scale));
    padding: 0 calc(13px * var(--panel-ui-scale));
    border-radius: calc(14px * var(--panel-ui-scale));
    border: 1px solid rgba(226, 238, 255, 0.14);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03)),
      rgba(255, 255, 255, 0.03);
    color: rgba(248, 251, 255, 0.96);
    font-size: calc(12px * var(--panel-ui-scale));
    outline: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .setup-input::placeholder {
    color: rgba(228, 238, 252, 0.42);
  }

  .setup-input:focus,
  .setup-input:focus-visible {
    border-color: rgba(240, 246, 255, 0.28);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)),
      rgba(255, 255, 255, 0.04);
  }

  .setup-error {
    margin: 0;
    font-size: calc(12px * var(--panel-ui-scale));
    line-height: 1.55;
    color: rgba(255, 215, 215, 0.94);
  }

  .setup-actions {
    display: flex;
    gap: calc(8px * var(--panel-ui-scale));
    margin-top: calc(2px * var(--panel-ui-scale));
  }

  .setup-actions .primary-button {
    width: 100%;
  }

  .hidden {
    display: none;
  }

  :host {
    --mx-bg: #ffffff;
    --mx-bg-soft: #f2f2f2;
    --mx-text: #111111;
    --mx-muted: #666666;
    --mx-border: #d8d8d8;
    --mx-hover: #ebebeb;
    --mx-primary: #111111;
    --mx-primary-text: #ffffff;
    --mx-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    --mx-danger: #b42318;
    --mx-success: #111111;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --mx-bg: #101010;
      --mx-bg-soft: #171717;
      --mx-text: #f7f7f7;
      --mx-muted: #a8a8a8;
      --mx-border: #303030;
      --mx-hover: #202020;
      --mx-primary: #f7f7f7;
      --mx-primary-text: #000000;
      --mx-shadow: 0 18px 50px rgba(0, 0, 0, 0.48);
      --mx-danger: #ff6b6b;
      --mx-success: #f7f7f7;
    }
  }

  *, *::before, *::after {
    letter-spacing: 0 !important;
  }

  .panel,
  .image-action-menu,
  .image-action-toast,
  .history-rail-inner,
  .generator-site-menu,
  .history-flyover-face {
    color: var(--mx-text) !important;
    background: var(--mx-bg) !important;
    border: 1px solid var(--mx-border) !important;
    box-shadow: var(--mx-shadow) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .panel,
  .history-rail-inner,
  .generator-site-menu {
    border-radius: 8px !important;
  }

  .image-action-menu,
  .image-action-toast,
  .minimized-toggle-card,
  .primary-button,
  .secondary-button,
  .history-button,
  .language-select,
  .generator-primary-button,
  .generator-site-option,
  .setup-input,
  .prompt-editor,
  .tag {
    border-radius: 8px !important;
  }

  .panel::before,
  .panel::after,
  .ring-glow,
  .glass-pill,
  .history-card-face::before,
  .history-card-face::after,
  .history-flyover-face::before,
  .history-flyover-face::after {
    display: none !important;
  }

  .body,
  .scroll-area,
  .prompt,
  .prompt-editor,
  .setup-input,
  .progress-track,
  .history-list,
  .history-card-face,
  .minimized-toggle-card,
  .generator-site-option,
  .generator-site-logo,
  .tag {
    color: var(--mx-text) !important;
    background: var(--mx-bg-soft) !important;
    border-color: var(--mx-border) !important;
    box-shadow: none !important;
  }

  .image-action-button,
  .secondary-button,
  .history-button,
  .minimized-icon-button,
  .history-close-button,
  .history-delete-button,
  .language-select,
  .generator-site-option {
    color: var(--mx-text) !important;
    background: var(--mx-bg) !important;
    border: 1px solid var(--mx-border) !important;
    box-shadow: none !important;
  }

  .image-action-button:hover,
  .secondary-button:hover,
  .history-button:hover,
  .minimized-icon-button:hover,
  .history-close-button:hover,
  .history-delete-button:hover,
  .language-select:hover,
  .generator-site-option:hover,
  .minimized-toggle-card:hover {
    background: var(--mx-hover) !important;
    border-color: var(--mx-border) !important;
  }

  .primary-button,
  .generator-primary-button,
  .progress-bar,
  .history-button.is-active,
  .minimized-toggle-card.is-active .minimized-toggle-switch {
    color: var(--mx-primary-text) !important;
    background: var(--mx-primary) !important;
    border-color: var(--mx-primary) !important;
    box-shadow: none !important;
  }

  .primary-button:hover,
  .generator-primary-button:hover {
    color: var(--mx-primary-text) !important;
    background: var(--mx-primary) !important;
    filter: none !important;
  }

  .eyebrow,
  .title,
  .loading-status,
  .progress-value,
  .error-text,
  .setup-copy,
  .setup-label,
  .generator-site-option-url,
  .history-rail-title,
  .history-rail-count,
  .minimized-toggle-title {
    color: var(--mx-text) !important;
  }

  .setup-input::placeholder,
  .prompt-editor::placeholder {
    color: var(--mx-muted) !important;
  }

  .setup-error,
  .history-delete-button,
  .minimized-icon-button.is-danger {
    color: var(--mx-danger) !important;
  }

  .image-action-button.is-success,
  .button-check {
    color: var(--mx-success) !important;
  }

  .footer {
    border-color: var(--mx-border) !important;
    background: var(--mx-bg) !important;
  }

  .language-picker {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
  }

  .language-select {
    width: 100%;
    min-width: 0;
    height: calc(34px * var(--panel-ui-scale));
    box-sizing: border-box;
    padding: 0 calc(28px * var(--panel-ui-scale)) 0 calc(10px * var(--panel-ui-scale));
    font-size: calc(12px * var(--panel-ui-scale));
    font-weight: 600;
    appearance: auto;
    cursor: pointer;
    outline: none;
  }

  :host {
    --mx-bg: #f6f8fb;
    --mx-panel: #ffffff;
    --mx-panel-soft: #f2f5f9;
    --mx-panel-softer: #e9eef6;
    --mx-text: #111827;
    --mx-muted: #6b7280;
    --mx-subtle: #9ca3af;
    --mx-line: #d8dee9;
    --mx-line-strong: #c7d0df;
    --mx-primary: #2563eb;
    --mx-primary-hover: #1d4ed8;
    --mx-primary-text: #ffffff;
    --mx-danger: #dc2626;
    --mx-success: #15803d;
    --mx-shadow: 0 18px 44px rgba(15, 23, 42, 0.16);
    --mx-shadow-soft: 0 8px 20px rgba(15, 23, 42, 0.08);
  }

  *, *::before, *::after {
    letter-spacing: 0 !important;
    box-sizing: border-box !important;
  }

  .panel-shell {
    display: flex !important;
    gap: 10px !important;
    align-items: flex-start !important;
  }

  .panel {
    width: min(410px, calc(var(--imagetoprompt-vw, 100vw) - 24px)) !important;
    min-width: min(410px, calc(var(--imagetoprompt-vw, 100vw) - 24px)) !important;
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 12px !important;
    box-shadow: var(--mx-shadow) !important;
    overflow: hidden !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .panel.is-minimized {
    width: 330px !important;
    min-width: 330px !important;
  }

  .panel::before,
  .panel::after,
  .ring-glow,
  .glass-pill,
  .history-card-face::before,
  .history-card-face::after,
  .history-flyover-face::before,
  .history-flyover-face::after,
  .generator-logo-stream::before,
  .generator-logo-stream::after {
    display: none !important;
  }

  .panel-inner {
    max-height: min(82vh, 680px) !important;
    padding: 0 !important;
    background: var(--mx-panel) !important;
  }

  .header {
    min-height: 0 !important;
    margin: 0 !important;
    padding: 14px 14px 12px !important;
    align-items: center !important;
    gap: 12px !important;
    border-bottom: 1px solid var(--mx-line) !important;
    background: var(--mx-panel) !important;
  }

  .header.is-loading {
    min-height: 0 !important;
    margin-bottom: 0 !important;
  }

  .header-copy,
  .header.is-loading .header-copy {
    padding: 0 !important;
    min-width: 0 !important;
  }

  .panel-thumb {
    width: 52px !important;
    height: 52px !important;
    min-width: 52px !important;
    border-radius: 10px !important;
    border: 1px solid var(--mx-line) !important;
    background: var(--mx-panel-soft) !important;
    overflow: hidden !important;
    box-shadow: var(--mx-shadow-soft) !important;
  }

  .panel-thumb img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .eyebrow {
    color: var(--mx-muted) !important;
    font-size: 11px !important;
    font-weight: 650 !important;
    text-transform: uppercase !important;
  }

  .title-row {
    margin-top: 3px !important;
  }

  .title {
    color: var(--mx-text) !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
  }

  .header-actions {
    position: static !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 8px !important;
    margin-left: auto !important;
  }

  .close-button,
  .minimized-icon-button,
  .history-button,
  .history-close-button,
  .history-delete-button {
    width: 34px !important;
    height: 34px !important;
    min-width: 34px !important;
    color: var(--mx-muted) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 8px !important;
    box-shadow: none !important;
  }

  .close-button:hover,
  .minimized-icon-button:hover,
  .history-button:hover,
  .history-close-button:hover,
  .history-delete-button:hover {
    color: var(--mx-text) !important;
    background: var(--mx-panel-soft) !important;
    border-color: var(--mx-line-strong) !important;
    transform: none !important;
  }

  .body {
    padding: 14px !important;
    gap: 12px !important;
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
  }

  .body-success {
    min-height: 310px !important;
  }

  .scroll-area {
    max-height: min(48vh, 390px) !important;
    padding: 12px !important;
    overflow: auto !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 10px !important;
    background: var(--mx-panel-soft) !important;
  }

  .scroll-area.json-scroll {
    max-height: min(48vh, 390px) !important;
  }

  .analysis,
  .prompt,
  .prompt-editor,
  .error-text,
  .setup-copy,
  .loading-status {
    color: var(--mx-text) !important;
  }

  .prompt-editor,
  .prompt {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    color: var(--mx-text) !important;
    font-size: 13px !important;
    line-height: 1.68 !important;
  }

  .prompt-editor.json-view {
    font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace !important;
    font-size: 12px !important;
    line-height: 1.6 !important;
  }

  .success-meta {
    min-height: 0 !important;
  }

  .tags {
    gap: 6px !important;
  }

  .tag {
    padding: 5px 8px !important;
    color: #374151 !important;
    background: #eef2f7 !important;
    border: 1px solid #dbe3ee !important;
    border-radius: 999px !important;
    box-shadow: none !important;
    font-size: 11px !important;
  }

  .footer {
    grid-template-columns: minmax(0, 1.1fr) minmax(112px, 0.9fr) !important;
    gap: 10px !important;
    margin: 0 !important;
    padding: 12px 14px 14px !important;
    border-top: 1px solid var(--mx-line) !important;
    background: var(--mx-panel) !important;
  }

  .primary-button,
  .secondary-button,
  .generator-primary-button,
  .generator-site-trigger,
  .generator-site-option,
  .language-select,
  .setup-input,
  .image-action-button,
  .minimized-toggle-card {
    border-radius: 8px !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .primary-button,
  .generator-primary-button {
    min-height: 44px !important;
    color: var(--mx-primary-text) !important;
    background: var(--mx-primary) !important;
    border: 1px solid var(--mx-primary) !important;
    font-weight: 700 !important;
  }

  .primary-button:hover,
  .generator-primary-button:hover {
    color: var(--mx-primary-text) !important;
    background: var(--mx-primary-hover) !important;
    border-color: var(--mx-primary-hover) !important;
    transform: none !important;
  }

  .secondary-button,
  .generator-site-trigger,
  .language-select,
  .setup-input,
  .image-action-button,
  .generator-site-option {
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
  }

  .secondary-button:hover,
  .generator-site-trigger:hover,
  .language-select:hover,
  .image-action-button:hover,
  .generator-site-option:hover {
    background: var(--mx-panel-soft) !important;
    border-color: var(--mx-line-strong) !important;
    transform: none !important;
  }

  .language-picker {
    min-width: 0 !important;
  }

  .language-select {
    height: 44px !important;
    padding: 0 10px !important;
    color: var(--mx-text) !important;
    font-size: 12px !important;
  }

  .generator-action-row {
    min-height: 44px !important;
    border-radius: 8px !important;
    box-shadow: none !important;
  }

  .generator-primary-button,
  .generator-site-trigger {
    height: 44px !important;
    min-height: 44px !important;
  }

  .generator-primary-button {
    border-radius: 8px 0 0 8px !important;
  }

  .generator-site-trigger {
    width: 44px !important;
    border-radius: 0 8px 8px 0 !important;
    color: var(--mx-primary-text) !important;
    background: var(--mx-primary) !important;
    border-color: var(--mx-primary) !important;
  }

  .generator-logo-stream {
    display: none !important;
  }

  .generator-button-copy {
    justify-content: center !important;
  }

  .generator-site-menu {
    top: calc(100% + 8px) !important;
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 10px !important;
    box-shadow: var(--mx-shadow-soft) !important;
  }

  .generator-site-option-url {
    color: var(--mx-muted) !important;
  }

  .loading {
    gap: 10px !important;
  }

  .progress-track {
    height: 8px !important;
    background: var(--mx-panel-softer) !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .progress-bar {
    background: var(--mx-primary) !important;
    box-shadow: none !important;
  }

  .progress-value,
  .setup-label,
  .setup-input::placeholder,
  .prompt-editor::placeholder {
    color: var(--mx-muted) !important;
  }

  .loading-status {
    margin-top: 2px !important;
    color: var(--mx-muted) !important;
    animation: none !important;
  }

  .setup-shell {
    gap: 12px !important;
  }

  .setup-input {
    height: 42px !important;
    background: var(--mx-panel-soft) !important;
  }

  .setup-input:focus,
  .setup-input:focus-visible {
    border-color: var(--mx-primary) !important;
    background: var(--mx-panel) !important;
  }

  .setup-error,
  .minimized-icon-button.is-danger,
  .history-delete-button {
    color: var(--mx-danger) !important;
  }

  .image-action-menu,
  .image-action-toast {
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 10px !important;
    box-shadow: var(--mx-shadow-soft) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .image-action-button.is-success,
  .button-check {
    color: var(--mx-success) !important;
  }

  .minimized-panel {
    width: 330px !important;
    min-width: 330px !important;
    padding: 10px !important;
    background: var(--mx-panel) !important;
  }

  .minimized-toggle-card {
    color: var(--mx-text) !important;
    background: var(--mx-panel-soft) !important;
    border: 1px solid var(--mx-line) !important;
  }

  .minimized-toggle-title {
    color: var(--mx-text) !important;
  }

  .minimized-toggle-switch {
    border-color: var(--mx-line) !important;
    background: var(--mx-panel-softer) !important;
    box-shadow: none !important;
  }

  .minimized-toggle-card.is-active .minimized-toggle-switch {
    border-color: var(--mx-primary) !important;
    background: var(--mx-primary) !important;
    box-shadow: none !important;
  }

  .history-rail {
    width: 220px !important;
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 12px !important;
    box-shadow: var(--mx-shadow) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  .history-rail::before {
    display: none !important;
  }

  .history-rail-inner {
    padding: 14px !important;
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
  }

  .history-rail-title {
    color: var(--mx-text) !important;
    font-weight: 700 !important;
  }

  .history-rail-count,
  .history-empty {
    color: var(--mx-muted) !important;
  }

  .history-card-shell,
  .history-card-face {
    border-radius: 10px !important;
  }

  .history-card-face {
    color: var(--mx-text) !important;
    background: var(--mx-panel-soft) !important;
    border: 1px solid var(--mx-line) !important;
    box-shadow: none !important;
  }

  .history-item.is-selected .history-card-face,
  .history-button.is-active {
    border-color: var(--mx-primary) !important;
    background: #eff6ff !important;
  }

  .history-flyover-face {
    color: var(--mx-text) !important;
    background: var(--mx-panel) !important;
    border: 1px solid var(--mx-line) !important;
    border-radius: 10px !important;
    box-shadow: var(--mx-shadow-soft) !important;
  }

  @media (max-width: 520px) {
    .panel,
    .panel.is-minimized {
      width: calc(var(--imagetoprompt-vw, 100vw) - 24px) !important;
      min-width: calc(var(--imagetoprompt-vw, 100vw) - 24px) !important;
    }

    .footer {
      grid-template-columns: 1fr !important;
    }

    .history-rail {
      display: none !important;
    }
  }

  @keyframes generatorLogoFlow {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes borderOrbit {
    0% {
      transform: rotate(0deg) scale(0.998);
      opacity: 0.56;
    }

    50% {
      opacity: 0.98;
    }

    100% {
      transform: rotate(360deg) scale(1.002);
      opacity: 0.56;
    }
  }

  @keyframes borderOrbitBurst {
    0% {
      transform: rotate(-8deg) scale(0.992);
      opacity: 0;
    }

    18% {
      opacity: 1;
    }

    72% {
      opacity: 0.92;
    }

    100% {
      transform: rotate(154deg) scale(1.006);
      opacity: 0;
    }
  }

  @keyframes panelWindowExpand {
    0% {
      opacity: 0.82;
      transform: translateY(5px) scaleY(0.94) scaleX(0.992);
      clip-path: inset(9% 0 11% 0 round 30px);
    }

    68% {
      opacity: 1;
      transform: translateY(-1px) scaleY(1.008) scaleX(1);
      clip-path: inset(0 0 1% 0 round 30px);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scaleY(1) scaleX(1);
      clip-path: inset(0 0 0 0 round 30px);
    }
  }

  @keyframes resultReveal {
    0% {
      opacity: 0;
      transform: translateY(3px) scaleY(0.992);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  }

  @keyframes promptReveal {
    0% {
      opacity: 0;
      filter: blur(7px);
      transform: translateY(6px);
      clip-path: inset(0 100% 0 0 round 0);
    }

    45% {
      opacity: 0.72;
      filter: blur(3px);
    }

    100% {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
      clip-path: inset(0 0 0 0 round 0);
    }
  }

  @keyframes checkPop {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes historyRailIn {
    0% {
      opacity: 0;
      transform: translateX(-10px) scale(0.985);
    }

    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes historyPlaceholderSweep {
    0% {
      transform: translateX(-120%);
    }

    100% {
      transform: translateX(120%);
    }
  }

  @keyframes imageActionMenuIn {
    0% {
      opacity: 0;
      transform: translateY(-4px) scale(0.94);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes imageActionToastIn {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;function m(e,t,i){return i<t?t:Math.min(Math.max(e,t),i)}function di(){return v<36?ft[0]:v<71?ft[1]:v<94?ft[2]:"校验输出"}function qi(e){return e<36?20:e<71?12:e<88?4.5:1.8}function Ot(){if(l.status!=="loading"||!u)return;const e=u.querySelector(".progress-bar");e&&(e.style.width=`${v.toFixed(1)}%`);const t=u.querySelector(".progress-value");t&&(t.textContent=`${Math.round(v)}%`);const i=u.querySelector(".loading-status");i&&(i.textContent=`${di()}...`)}function pi(e){if(l.status!=="loading"){R();return}ie===null&&(ie=e);const t=Math.min((e-ie)/1e3,.05);ie=e,v=Math.min(98,v+qi(v)*t),Ot(),H=window.requestAnimationFrame(pi)}function Bi(){R(),v=12,_t=performance.now(),ie=null,H=window.requestAnimationFrame(pi)}function R(e){typeof e=="number"&&(v=e),H!==null&&(window.cancelAnimationFrame(H),H=null),ie=null,_t=null}async function bt(e,t){const i=v,n=Math.max(i,e);await new Promise(a=>{const r=performance.now(),o=c=>{if(l.status!=="loading"){H=null,a();return}const s=Math.min(1,(c-r)/t);if(v=i+(n-i)*s,Ot(),s>=1){H=null,a();return}H=window.requestAnimationFrame(o)};H=window.requestAnimationFrame(o)})}async function Vi(){if(l.status!=="loading"){R(100);return}const e=1200,t=170,i=260,n=120,a=_t??performance.now(),r=performance.now()-a;if(r<e&&await new Promise(o=>{window.setTimeout(()=>o(),e-r)}),l.status!=="loading"){R(100);return}H!==null&&(window.cancelAnimationFrame(H),H=null),ie=null,v<36&&(await bt(38,180),l.status==="loading"&&await new Promise(o=>{window.setTimeout(()=>o(),t)})),l.status==="loading"&&v<71&&(await bt(73,210),l.status==="loading"&&await new Promise(o=>{window.setTimeout(()=>o(),t)})),l.status==="loading"&&await bt(100,i),l.status==="loading"&&(v=100,Ot(),await new Promise(o=>{window.setTimeout(()=>o(),n)})),R(100)}function ht(e){return e instanceof HTMLImageElement}function Ki(e){const t=e.trim();if(!t)return null;try{return new URL(t,window.location.href).href}catch{return t}}function Xi(e){const t=e.match(/url\((['"]?)(.*?)\1\)/i);return t?.[2]?Ki(t[2]):null}function Ji(e,t){if(!e||!(e instanceof Element))return null;if(ht(e))return e;const i=e.closest("img");return ht(i)?i:t?null:ht(i)?i:null}function Zi(e){return e instanceof HTMLImageElement?[e.alt,e.currentSrc,e.src,e.id,typeof e.className=="string"?e.className:"",e.getAttribute("aria-label")??"",e.getAttribute("data-testid")??""].join(" ").toLowerCase():[e.id,typeof e.className=="string"?e.className:"",e.getAttribute("aria-label")??"",e.getAttribute("title")??"",e.getAttribute("data-title")??"",e.getAttribute("data-testid")??"",e.getAttribute("role")??""].join(" ").toLowerCase()}function Dt(e){const t=e.currentSrc||e.src;return t?{src:t,alt:e.alt||void 0,pageUrl:window.location.href,naturalWidth:e.naturalWidth||void 0,naturalHeight:e.naturalHeight||void 0}:null}function Qi(e){const t=window.getComputedStyle(e).backgroundImage;if(!t||t==="none")return null;const i=Xi(t);if(!i)return null;const n=e.getBoundingClientRect(),a=e.getAttribute("aria-label")||e.getAttribute("title")||e.getAttribute("data-title")||void 0;return{src:i,alt:a||void 0,pageUrl:window.location.href,naturalWidth:n.width>0?Math.round(n.width):void 0,naturalHeight:n.height>0?Math.round(n.height):void 0}}function ui(e,t){const i=t&&typeof document.elementsFromPoint=="function"?document.elementsFromPoint(t.x,t.y):[],n=[],a=new Set,r=o=>!!o.closest("#imagetoprompt-root");e instanceof Element&&!r(e)&&(n.push(e),a.add(e)),i.forEach(o=>{r(o)||a.has(o)||(n.push(o),a.add(o))});for(const o of n){const c=Ji(o,t);if(c)return{element:c,target:Dt(c),point:t};const s=Qi(o);if(s)return{element:o,target:s,point:t}}return{element:null,target:null,point:t}}function Nt(e){const t=e.getBoundingClientRect();if(t.width<=0||t.height<=0)return!1;const i=Zi(e),n=Math.max(t.width,t.height),a=Math.min(t.width,t.height),r=t.width*t.height,o=n/Math.max(1,a),c=/(^|[\s/_-])(icon|logo|avatar|emoji|favicon|badge|sprite|sticker)([\s/_-]|$)/.test(i)||n<=42||n<=64&&o<=1.45||n<=84&&a<=64&&o<=1.35,s=a<104||r<14e3;return c||s?!1:t.width>=112&&t.height>=112}function en(e){const t=e.getBoundingClientRect(),i=Math.min(t.width,t.height);return i<=96?.76:i<=128?.84:i<=168?.92:1}function Ge(){Be!==null&&(window.clearTimeout(Be),Be=null)}function tn(){re!==null&&(window.clearTimeout(re),re=null)}function gi(){Ie.forEach(e=>{window.clearTimeout(e)}),Ie=[]}function nn(e,t){gi(),[90,220].forEach(i=>{const n=window.setTimeout(()=>{Ie=Ie.filter(a=>a!==n),K&&(q!==e||N?.src!==t||pt())},i);Ie.push(n)})}function fi(e){return ci.get(e)??{promptStatus:"idle",saveStatus:"idle"}}async function mi(){try{_e=(await chrome.storage.local.get(Me))[Me]===!0}catch{_e=!1}finally{lt=!0}}async function rn(){return lt||await mi(),_e}async function an(){_e=!0,lt=!0,await chrome.storage.local.set({[Me]:!0})}function ee(){if(!J)return;if(!K||!C||ct()){J.innerHTML="";return}const e=N,t=q,i=!!(e&&t&&Nt(t)),n=e?fi(e.src):null,a=t?en(t):1,r=n?.promptStatus==="loading"?d.promptLoading:d.promptAction;J.innerHTML=i?`
      <div class="image-action-menu" aria-label="${d.actionMenuLabel}" style="--image-action-scale:${a.toFixed(3)};">
        <button
          type="button"
          class="image-action-button${n?.promptStatus==="loading"?" is-disabled":""}"
          data-inline-action="prompt"
          ${n?.promptStatus==="loading"?"disabled":""}
        >${r}</button>
      </div>
    `:"";const o=J.querySelector(".image-action-menu");o&&(o.onpointerenter=()=>{B=!0,Ge()},o.onpointerleave=()=>{B=!1,Oe()},o.querySelectorAll("[data-inline-action]").forEach(s=>{s.onclick=async g=>{if(g.preventDefault(),g.stopPropagation(),!N||!q)return;s.dataset.inlineAction==="prompt"&&await sr()}})),pt()}function ge(){if(ue){if(!K||!ne||ct()){ue.innerHTML="";return}ue.innerHTML=`
    <div class="image-action-toast${ne.tone==="error"?" is-error":""}">
      ${S(ne.message)}
    </div>
  `}}function Qt(e,t){const i=fi(e);ci.set(e,{...i,...t}),N?.src===e&&ee()}function Ce(e,t){if(ct())return;const i=`${t}:${e}`,n=Date.now();if(tn(),ne&&qe===i&&n-Zt<900){re=window.setTimeout(()=>{ne=null,qe="",re=null,ge()},2200);return}qe=i,Zt=n,ne={message:e,tone:t},ge(),re=window.setTimeout(()=>{ne=null,qe="",re=null,ge()},2200)}function L(){Ge(),gi(),q=null,N=null,be=null,B=!1,ee()}function Et(e=900){li=Date.now()+e}function ei(){return Date.now()<li}function Oe(){Ge(),Be=window.setTimeout(()=>{B||L()},120)}function on(e,t,i){Ge();const n=q!==e||N?.src!==t.src;if(q=e,N=t,be=i,n){ee(),nn(e,t.src);return}pt()}const Qe="historyEntries",et="latestAnalysisSnapshot",ze="enabled";function Re(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}function Pt(e){if(e===null)return null;if(typeof e=="string")return e.trim();if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="boolean")return e;if(Array.isArray(e))return e.map(t=>Pt(t)).filter(t=>t!==void 0);if(typeof e=="object"){const t={};return Object.entries(e).forEach(([i,n])=>{const a=Pt(n);a!==void 0&&(t[i]=a)}),t}}function yt(e){const t=Pt(e);return typeof t=="object"&&t!==null&&!Array.isArray(t)?t:{}}function te(e,t,i,n){const a=e[i];if(typeof a=="string")return a.trim();const r=t[n];if(typeof r=="string")return r.trim();const o=t[i];return typeof o=="string"?o.trim():""}function ti(e,t,i,n){return e[i]!==void 0?Re(e[i]):t[n]!==void 0?Re(t[n]):Re(t[i])}function wi(e){return e==="en"||e==="json"||e==="ja"?e:e==="zh_hant"||e==="zhHant"?"zh_hant":"zh"}const LanguageChoices=[{key:"zh",label:"简体中文"},{key:"zh_hant",label:"繁体中文"},{key:"en",label:"英语"},{key:"ja",label:"日语"},{key:"json",label:"结构化数据"}];function languageKeys(e){const t=wi(e);return t==="zh_hant"?["zh_hant","zhHant"]:t==="ja"?["ja"]:t==="en"?["en"]:t==="json"?["json"]:["zh"]}function promptBlock(e,t,i=null){for(const n of languageKeys(t)){const a=e[n];if(a&&typeof a==="object"&&typeof a.prompt==="string"&&typeof a.analysis==="string")return{prompt:a.prompt.trim(),analysis:a.analysis.trim()}}return i}function tagList(e,t){for(const i of languageKeys(t)){const n=Re(e[i]);if(n.length)return n}return[]}function bi(e){if(typeof e!="object"||e===null)return{};const t=e,i={};return["zh","zh_hant","zhHant","en","ja","json"].forEach(n=>{typeof t[n]==="string"&&(i[n]=t[n].trim())}),i.zh_hant&&!i.zhHant&&(i.zhHant=i.zh_hant),i.zhHant&&!i.zh_hant&&(i.zh_hant=i.zhHant),i}function hi(e){if(typeof e!=="object"||e===null)return null;const t=e,i=promptBlock(t,"zh"),n=promptBlock(t,"en"),a=promptBlock(t,"zh_hant",i),r=promptBlock(t,"ja",n??i),o=t.jsonPrompt,c=t.styleTags;if(!i||!n||typeof o!=="object"||o===null||typeof c!=="object"||c===null)return null;const s=o,g=c,f=Object.keys(yt(s.raw)).length>0?yt(s.raw):yt({subject:s.subject,action_pose:s.actionPose,details_appearance:s.detailsAppearance,environment_background:s.environmentBackground,lighting_atmosphere:s.lightingAtmosphere,composition_framing:s.compositionFraming,style_camera:s.styleCamera,colors:s.colors,materials:s.materials,aspect_ratio:s.aspectRatio,quality_modifiers:s.qualityModifiers,likely_generation_intent:s.likelyGenerationIntent}),F=tagList(g,"zh"),$=tagList(g,"zh_hant"),T=tagList(g,"en"),M=tagList(g,"ja");return{zh:i,zhHant:a,zh_hant:a,en:n,ja:r,jsonPrompt:{subject:te(s,f,"subject","subject"),actionPose:te(s,f,"actionPose","action_pose"),detailsAppearance:te(s,f,"detailsAppearance","details_appearance"),environmentBackground:te(s,f,"environmentBackground","environment_background"),lightingAtmosphere:te(s,f,"lightingAtmosphere","lighting_atmosphere"),compositionFraming:te(s,f,"compositionFraming","composition_framing"),styleCamera:te(s,f,"styleCamera","style_camera"),colors:ti(s,f,"colors","colors"),materials:ti(s,f,"materials","materials"),aspectRatio:te(s,f,"aspectRatio","aspect_ratio"),qualityModifiers:ti(s,f,"qualityModifiers","quality_modifiers"),likelyGenerationIntent:te(s,f,"likelyGenerationIntent","likely_generation_intent"),raw:f},styleTags:{zh:F,zhHant:$.length?$:F,zh_hant:$.length?$:F,en:T.length?T:F,ja:M.length?M:T.length?T:F},recreationPrompt:typeof t.recreationPrompt=="string"?t.recreationPrompt.trim():typeof t.recreation_prompt=="string"?t.recreation_prompt.trim():"",promptCore:typeof t.promptCore=="string"?t.promptCore.trim():typeof t.prompt_core=="string"?t.prompt_core.trim():"",negativePrompt:typeof t.negativePrompt=="string"?t.negativePrompt.trim():typeof t.negative_prompt=="string"?t.negative_prompt.trim():"",confidence:typeof t.confidence==="number"&&Number.isFinite(t.confidence)?Math.min(1,Math.max(0,t.confidence)):void 0}}function sn(e){if(typeof e!="object"||e===null)return null;const t=e;return typeof t.src!="string"||typeof t.pageUrl!="string"?null:{src:t.src,alt:typeof t.alt=="string"&&t.alt.trim()?t.alt.trim():void 0,pageUrl:t.pageUrl,naturalWidth:typeof t.naturalWidth=="number"&&Number.isFinite(t.naturalWidth)?t.naturalWidth:void 0,naturalHeight:typeof t.naturalHeight=="number"&&Number.isFinite(t.naturalHeight)?t.naturalHeight:void 0}}function yi(e){return Array.isArray(e)?e.map(i=>{if(typeof i!="object"||i===null)return null;const n=i,a=hi(n.analysis);return!a||typeof n.id!="string"||typeof n.createdAt!="number"||!Number.isFinite(n.createdAt)||typeof n.imageSrc!="string"||typeof n.pageUrl!="string"?null:{id:n.id,createdAt:n.createdAt,imageSrc:n.imageSrc,pageUrl:n.pageUrl,imageWidth:typeof n.imageWidth=="number"&&Number.isFinite(n.imageWidth)?n.imageWidth:void 0,imageHeight:typeof n.imageHeight=="number"&&Number.isFinite(n.imageHeight)?n.imageHeight:void 0,analysis:a,promptDrafts:bi(n.promptDrafts)}}).filter(i=>i!==null).sort((i,n)=>n.createdAt-i.createdAt).slice(0,80):[]}function ln(e){if(typeof e!="object"||e===null)return null;const t=e,i=sn(t.target),n=hi(t.analysis);return!i||!n||typeof t.createdAt!="number"||!Number.isFinite(t.createdAt)?null:{createdAt:t.createdAt,target:i,analysis:n,promptDrafts:bi(t.promptDrafts)}}async function Yt(){const e=await chrome.storage.local.get(Qe);return yi(e[Qe])}async function cn(e){return await Yt()}async function dn(e){const i=(await Yt()).filter(n=>n.id!==e);return await chrome.storage.local.set({[Qe]:i}),i}async function De(){const e=await chrome.storage.local.get(et);return ln(e[et])}async function xi(e){await chrome.storage.local.set({[et]:{createdAt:e.createdAt,target:e.target,analysis:e.analysis,promptDrafts:e.promptDrafts}})}function pn(e){return e==="expanded"||e==="minimized"?e:"hidden"}function vi(e){if(typeof e!="object"||e===null)return{mode:"hidden",language:"zh",inlineActionsEnabled:!0,updatedAt:0};const t=e,i=typeof t.position=="object"&&t.position!==null?t.position:null,n=i&&typeof i.left=="number"&&Number.isFinite(i.left)&&typeof i.top=="number"&&Number.isFinite(i.top)?{left:i.left,top:i.top}:void 0;return{mode:pn(t.mode),language:wi(t.language),inlineActionsEnabled:typeof t.inlineActionsEnabled=="boolean"?t.inlineActionsEnabled:!0,position:n,updatedAt:typeof t.updatedAt=="number"&&Number.isFinite(t.updatedAt)?t.updatedAt:0}}async function un(){const e=await chrome.storage.local.get($e);return vi(e[$e])}function gn(){const e=we();if(e){const t=e.getBoundingClientRect();return{left:t.left,top:t.top}}if(y)return{left:y.left,top:y.top}}function fn(e=h){return{mode:e,language:l.language,inlineActionsEnabled:C,position:gn(),updatedAt:Date.now()}}async function P(e=h){await chrome.storage.local.set({[$e]:fn(e)})}function Si(e){h=e.mode,C=e.inlineActionsEnabled,l.language=wi(e.language),y=e.position?{left:e.position.left,top:e.position.top}:null}function Tt(e){if(K=e,!e){L(),ge(),l.status!=="hidden"&&Fe({preserveSessionMode:!0});return}ee(),ge(),Ht()}async function mn(){try{const e=await chrome.storage.local.get(ze);Tt(typeof e[ze]=="boolean"?e[ze]:!0)}catch{Tt(!0)}}function tt(e){return typeof e=="string"&&oi.includes(e)?e:"jimeng"}async function bn(){try{const e=await chrome.storage.local.get(Le);le=tt(e[Le])}catch{le="jimeng"}finally{l.status==="success"&&p()}}function Ai(e=le){return St[e]??St.jimeng}function ki(e=window.location.hostname){return oi.some(t=>St[t].matchHost(e))}function ct(){return ki()}async function ii(e){le=e;try{await chrome.storage.local.set({[Le]:e})}catch{return}}async function Ei(e){try{await navigator.clipboard.writeText(e)}catch{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Pi(e){if(!(e instanceof HTMLElement))return!1;const t=window.getComputedStyle(e),i=e.getBoundingClientRect();return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"&&i.width>=12&&i.height>=12}function ni(e){const t=e.getBoundingClientRect(),i=e.tagName.toLowerCase(),n=(e.getAttribute("role")??"").toLowerCase(),a=[e.getAttribute("placeholder")??"",e.getAttribute("aria-label")??"",e.getAttribute("data-placeholder")??"",e.getAttribute("title")??""].join(" ").toLowerCase(),r=/(prompt|message|describe|imagine|create|generate|ask|send|输入|提示|描述|生成|创作|想法)/.test(a),o=i==="textarea",c=i==="input"&&e.type==="text",s=e.isContentEditable||n==="textbox";return Math.min(t.width*t.height/2200,90)+(o?80:0)+(s?72:0)+(c?36:0)+(r?60:0)}function hn(e){const t=new Set;return e.flatMap(n=>Array.from(document.querySelectorAll(n))).filter(n=>Pi(n)).filter(n=>!(t.has(n)||(t.add(n),n.closest("#imagetoprompt-root"))||n instanceof HTMLInputElement&&n.type&&n.type!=="text")).sort((n,a)=>ni(a)-ni(n))[0]??null}function yn(e,t){const i=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(i,"value");n?.set?.call(e,t),n?.set||(e.value=t),e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"})),e.dispatchEvent(new Event("change",{bubbles:!0}))}function xn(e,t){e.focus();try{const i=window.getSelection();if(i){const a=document.createRange();a.selectNodeContents(e),i.removeAllRanges(),i.addRange(a)}if(document.execCommand("insertText",!1,t)){e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}));return}}catch{}e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"})),e.dispatchEvent(new Event("change",{bubbles:!0}))}function wn(e,t){const i=e.sendSelectors.flatMap(n=>Array.from(document.querySelectorAll(n))).find(n=>Pi(n));i instanceof HTMLElement&&i.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"}),t.focus()}function vn(e){const t=Ai(e.siteId);if(!t.matchHost(window.location.hostname))return!1;const i=hn(t.promptSelectors);return i?(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement?yn(i,e.prompt):xn(i,e.prompt),wn(t,i),!0):!1}function Ke(){Ve!==null&&(window.clearTimeout(Ve),Ve=null)}function Ti(e,t=0){if(pe=e,vn(e)){Ke(),pe=null;return}if(t>=Jt.length-1){Ke(),pe=null;return}Ke(),Ve=window.setTimeout(()=>{!pe||pe.requestId!==e.requestId||Ti(e,t+1)},Jt[t+1])}function we(){return u?.querySelector(".panel-shell")??null}function Ft(){return u?.querySelector(".panel")??null}function dt(){const e=window.visualViewport;return{width:Math.round(e?.width??window.innerWidth),height:Math.round(e?.height??window.innerHeight)}}function Wt(){if(!W)return;const e=dt();W.style.setProperty("--imagetoprompt-vw",`${e.width}px`),W.style.setProperty("--imagetoprompt-vh",`${e.height}px`)}function Sn(){return J?.querySelector(".image-action-menu")??null}function Gt(){return u?.querySelector(".history-list")??null}function An(){return u?.querySelector(".history-rail")??null}function kn(){const e=Gt();if(e){if(se!==null){me=se;return}me=e.scrollTop}}function ke(){const e=Gt();e&&(e.scrollTop=se??me)}function Ii(e=me){se=e,me=e,Ae!==null&&(window.clearTimeout(Ae),Ae=null),ke(),window.requestAnimationFrame(()=>{ke(),window.requestAnimationFrame(()=>{ke()})}),Ae=window.setTimeout(()=>{ke(),se=null,Ae=null},180)}function Ne(){const t=Gt()?.scrollTop??me;Ii(t)}function It(){kt?.remove(),kt=null}function Hi(){const e=Ft(),t=An();if(!e||!t)return;const i=Math.max(Math.round(e.getBoundingClientRect().height),180);t.style.height=`${i}px`}function pt(){const e=Sn(),t=q;if(!e||!t)return;if(!t.isConnected||!Nt(t)){L();return}const i=t.getBoundingClientRect();if(i.width<=0||i.height<=0||i.bottom<0||i.top>window.innerHeight){L();return}const n=e.offsetWidth||94,a=e.offsetHeight||84,r=10,o=m(Math.round(Math.min(i.width,i.height)*.06),6,10),c=window.innerWidth-n-r,s=window.innerHeight-a-r,g=(T,M)=>{if(typeof document.elementsFromPoint!="function")return!1;const X=document.elementsFromPoint(T,M);for(const I of X)if(I instanceof Element&&!I.closest("#imagetoprompt-root")){if(I===t)return!1;if(!I.contains(t))return!0}return!1},f=(T,M)=>{const X=Math.min(16,Math.max(6,n*.1)),I=Math.min(16,Math.max(6,a*.1));return[{x:m(T+X,r,window.innerWidth-r),y:m(M+I,r,window.innerHeight-r)},{x:m(T+n-X,r,window.innerWidth-r),y:m(M+I,r,window.innerHeight-r)},{x:m(T+X,r,window.innerWidth-r),y:m(M+a-I,r,window.innerHeight-r)},{x:m(T+n/2,r,window.innerWidth-r),y:m(M+a/2,r,window.innerHeight-r)},{x:m(T+n-X,r,window.innerWidth-r),y:m(M+a/2,r,window.innerHeight-r)},{x:m(T+n/2,r,window.innerWidth-r),y:m(M+I,r,window.innerHeight-r)}].some(Xt=>g(Xt.x,Xt.y))},F=[{left:m(i.right-n-o,r,c),top:m(i.top+o,r,s)},{left:m(i.left+o,r,c),top:m(i.top+o,r,s)},{left:m(i.left+o,r,c),top:m(i.bottom-a-o,r,s)}],$=F.find(T=>!f(T.left,T.top))??F[0];e.style.left=`${$.left}px`,e.style.top=`${$.top}px`}async function de(){return mt?k:(Se||(Se=Yt().then(e=>(k=e,mt=!0,Se=null,l.status!=="hidden"&&p(),e)).catch(()=>(k=[],mt=!0,Se=null,k))),Se)}function zi(){const e={};return["zh","zh_hant","zhHant","en","ja","json"].forEach(t=>{ji(t)&&(e[t]=ye[t]??"")}),e.zh_hant&&!e.zhHant&&(e.zhHant=e.zh_hant),e.zhHant&&!e.zh_hant&&(e.zh_hant=e.zhHant),e}function Ut(e){ye={...e}}function En(e,t){return{id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:Date.now(),imageSrc:t.imagePreviewSrc||e.src,pageUrl:e.pageUrl,imageWidth:typeof e.naturalWidth=="number"&&Number.isFinite(e.naturalWidth)&&e.naturalWidth>0?e.naturalWidth:void 0,imageHeight:typeof e.naturalHeight=="number"&&Number.isFinite(e.naturalHeight)&&e.naturalHeight>0?e.naturalHeight:void 0,analysis:t,promptDrafts:zi()}}function Pn(e){return{id:`pending-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,imageSrc:e.src,imageWidth:e.naturalWidth,imageHeight:e.naturalHeight}}function qt(e){const t=Pn(e);return j=[t,...j].slice(0,80),xe=!x,x=!0,p(),t}function Ye(e){const t=j.filter(i=>i.id!==e);t.length!==j.length&&(j=t,p())}function xt(e,t=!1){if(!E||E.requestId!==e)return null;const i=E;E=null;const n=j.filter(a=>a.id!==i.placeholderId);return n.length!==j.length&&(j=n,t&&p()),i}function Tn(e){return e.replace(/\s+/g," ").trim()}function In(e,t){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}…`}function he(){const e=we();if(!e)return;const t=e.getBoundingClientRect();y={left:t.left,top:t.top},$i()}function Ri(e,t){return{createdAt:Date.now(),target:{...e,src:t.imagePreviewSrc||e.src},analysis:t,promptDrafts:zi()}}function Bt(){!l.analysis||!z||xi(Ri(z,l.analysis))}async function Ht(){const[e,t]=await Promise.all([un(),De()]);if(Si(e),!K||e.mode==="hidden"){Fe({preserveSessionMode:!0}),ee();return}if(!t){if(l.status==="setup"){ce(),p();return}Fe({preserveSessionMode:!0});return}ce(),Ut(t.promptDrafts),O=null,z=t.target,w=null,A=null,ve(),R(),V(""),U=!1;const i=ut(t.analysis,l.language);Q=i,oe=i,D=!1,l={status:"success",language:l.language,analysis:t.analysis,error:"",copied:!1},p(),V(i)}function Hn(e){const t=e.trim().match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);if(!t)return null;const i=Number(t[1]),n=Number(t[2]);return!Number.isFinite(i)||!Number.isFinite(n)||i<=0||n<=0?null:i/n}function zn(e){if(typeof e.imageWidth=="number"&&Number.isFinite(e.imageWidth)&&e.imageWidth>0&&typeof e.imageHeight=="number"&&Number.isFinite(e.imageHeight)&&e.imageHeight>0)return e.imageWidth/e.imageHeight;const t=Hn(e.analysis.jsonPrompt.aspectRatio);return t&&Number.isFinite(t)&&t>0?t:1}function Rn(e){const t=zn(e);return Li(t)}function Li(e){const t=e>=.9?166:136,i=t/e;return{width:Math.round(t),height:Math.round(m(i,78,196))}}function Ln(){return"";if(!x)return"";const e=j.map(r=>{const o=r.imageWidth&&r.imageHeight&&r.imageHeight>0?r.imageWidth/r.imageHeight:1,c=Li(o);return`
        <div
          class="history-item is-pending"
          data-history-id="${r.id}"
          style="width:${c.width}px; height:${c.height}px;"
        >
          <div class="history-card-shell" aria-hidden="true">
            <div class="history-card-inner">
              <div class="history-card-face image-face is-placeholder">
                <img class="history-image-thumb" src="${S(r.imageSrc)}" alt="" />
                <div class="history-placeholder-badge">${d.savingHistory}</div>
              </div>
            </div>
          </div>
        </div>
      `}).join(""),t=k.some(r=>r.id===_),i=k.map(r=>{const o=je===r.id,c=_===r.id,s=Rn(r);return`
        <div
          class="history-item${c?" is-selected":""}${o?" is-pending":""}"
          data-history-id="${r.id}"
          style="width:${s.width}px; height:${s.height}px;"
        >
          <button
            type="button"
            class="history-delete-button"
            data-action="delete-history"
            data-history-id="${r.id}"
            aria-label="${d.deleteHistory}"
          >×</button>
          <div
            class="history-card-shell"
            data-action="toggle-history"
            data-history-id="${r.id}"
            role="button"
            tabindex="0"
            aria-label="${d.historyLabel}"
          >
            <div class="history-card-inner">
              <div class="history-card-face image-face">
                <img class="history-image-thumb" src="${S(r.imageSrc)}" alt="" />
              </div>
            </div>
          </div>
        </div>
      `}).join(""),n=`${e}${i}`,a=n.trim().length>0?`<div class="history-list${t?" has-selection":""}">${n}</div>`:`<div class="history-empty">${d.emptyHistory}</div>`;return`
    <aside class="history-rail${xe?" is-entering":""}">
      <div class="history-rail-inner">
        <div class="history-rail-header">
          <div class="history-rail-heading">
            <div class="history-rail-title">${d.history}</div>
            <div class="history-rail-count">${Math.min(80,k.length+j.length)}/80</div>
          </div>
          <button
            type="button"
            class="history-close-button"
            data-action="close-history"
            aria-label="${d.closeHistory}"
          >×</button>
        </div>
        ${a}
      </div>
    </aside>
  `}async function $n(e){const t=u?.querySelector(".body-success"),i=u?.querySelector(`[data-history-id="${e.id}"] .history-card-shell`);if(!t||!i||!Xe)return;It();const n=t.getBoundingClientRect(),a=i.getBoundingClientRect(),r=document.createElement("div"),o=In(Tn(Ue()??""),320);r.className="history-flyover",r.style.width=`${n.width}px`,r.style.height=`${n.height}px`,r.style.left=`${n.left}px`,r.style.top=`${n.top}px`,r.innerHTML=`
    <div class="history-flyover-inner">
      <div class="history-flyover-face prompt-face">
        <p class="history-flyover-front-copy">${S(o)}</p>
      </div>
      <div class="history-flyover-face image-face">
        <img class="history-flyover-image" src="${S(e.imageSrc)}" alt="" />
      </div>
    </div>
  `,Xe.append(r),kt=r;const c=a.left-n.left,s=a.top-n.top,g=a.width/n.width,f=a.height/n.height,F=r.animate([{transform:"translate3d(0px, 0px, 0px) scale(1)",opacity:.98,offset:0},{transform:`translate3d(${c*.26}px, ${s*.08}px, 0px) scale(0.92, 0.96)`,opacity:1,offset:.28},{transform:`translate3d(${c}px, ${s}px, 0px) scale(${g}, ${f})`,opacity:.82,offset:1}],{duration:760,easing:"cubic-bezier(0.22, 0.82, 0.2, 1)",fill:"forwards"});r.querySelector(".history-flyover-inner")?.animate([{transform:"rotateY(0deg)",offset:0},{transform:"rotateY(92deg)",offset:.48},{transform:"rotateY(180deg)",offset:1}],{duration:660,easing:"cubic-bezier(0.22, 0.82, 0.2, 1)",fill:"forwards"}),await F.finished.catch(()=>{}),It()}function it(e,t){ce(),Ut(e.promptDrafts),t?.preservePosition?he():(O=t?.anchorPoint?null:Kt(e.target.src),w=t?.anchorPoint??null,A=null),z=e.target,t?.preservePosition||(y=null),ve(),R(),U=!1;const i=ut(e.analysis,l.language);Q=i,oe=i,D=!1,Y({status:"success",analysis:e.analysis,error:"",copied:!1}),V(i)}function Mn(e){return{createdAt:e.createdAt,target:{src:e.imageSrc,pageUrl:e.pageUrl},analysis:e.analysis,promptDrafts:e.promptDrafts}}function jn(e){const t=k.find(i=>i.id===e);t&&(Ne(),_=e,h="expanded",it(Mn(t),{preservePosition:!0}),Bt(),P("expanded"))}function Vt(){const e=Ft();if(!e||A===null)return;const t=dt().width,i=`${Math.round(Math.min(A,Math.max(220,t-24)))}px`;e.style.width=i,e.style.minWidth=i,e.style.maxWidth=i}function $i(){const e=Ft();if(!e)return;const t=Math.round(e.getBoundingClientRect().width);if(t<=0)return;const i=dt().width;A=Math.min(t,Math.max(220,i-24)),Vt()}function ce(){if(W)return;W=document.createElement("div"),W.id="imagetoprompt-root",W.style.cssText=["all: initial","position: fixed","inset: 0","width: var(--imagetoprompt-vw, 100vw)","height: var(--imagetoprompt-vh, 100vh)","display: block","overflow: visible","pointer-events: none","z-index: 2147483646","font-size: 16px","line-height: normal","direction: ltr","unicode-bidi: isolate","transform: none","zoom: 1"].join("; "),Wt(),document.documentElement.appendChild(W),Xe=W.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=Ui,J=document.createElement("div"),J.className="image-action-overlay",ue=document.createElement("div"),ue.className="image-action-toast-layer",u=document.createElement("div"),u.className="overlay",Xe.append(e,J,ue,u),de(),ee(),ge(),p()}function _n(e){const t=e.jsonPrompt.raw&&Object.keys(e.jsonPrompt.raw).length>0?{...e.jsonPrompt.raw}:{subject:e.jsonPrompt.subject,action_pose:e.jsonPrompt.actionPose,details_appearance:e.jsonPrompt.detailsAppearance,environment_background:e.jsonPrompt.environmentBackground,lighting_atmosphere:e.jsonPrompt.lightingAtmosphere,composition_framing:e.jsonPrompt.compositionFraming,style_camera:e.jsonPrompt.styleCamera,colors:e.jsonPrompt.colors,materials:e.jsonPrompt.materials,aspect_ratio:e.jsonPrompt.aspectRatio,quality_modifiers:e.jsonPrompt.qualityModifiers,likely_generation_intent:e.jsonPrompt.likelyGenerationIntent};e.recreationPrompt&&(t.recreation_prompt=e.recreationPrompt),e.promptCore&&(t.prompt_core=e.promptCore),e.negativePrompt&&(t.negative_prompt=e.negativePrompt);return JSON.stringify(t,null,2)}function Mi(){ye={}}function ji(e){return Object.prototype.hasOwnProperty.call(ye,e)}function Cn(e,t){const i=wi(t);if(i==="json")return _n(e);const n=promptBlock(e,i);return n?.prompt??e.zh?.prompt??e.en?.prompt??""}function On(e,t){ye[e]=t}function ut(e,t){const i=wi(t);return ji(i)?ye[i]??"":Cn(e,i)}function Ue(){return l.analysis?ut(l.analysis,l.language):null}function Dn(){if(!l.analysis||wi(l.language)==="json")return[];const e=l.analysis.styleTags??{},t=tagList(e,l.language);return t.length?t:tagList(e,"zh")}function Nn(){const e=wi(l.language);return`<div class="language-picker"><select class="language-select" data-language-select="true" aria-label="Language">${LanguageChoices.map(({key:t,label:i})=>`<option value="${t}"${e===t?" selected":""}>${S(i)}</option>`).join("")}</select></div>`}function Yn(){return"";return`
    <button
      type="button"
      class="history-button${x?" is-active":""}"
      data-action="toggle-history-rail"
      aria-label="${d.history}"
      aria-pressed="${x?"true":"false"}"
    >
      <span class="history-button-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M7.5 4.5H14.7L18.5 8.3V18.25C18.5 19.2165 17.7165 20 16.75 20H7.5C6.5335 20 5.75 19.2165 5.75 18.25V6.25C5.75 5.2835 6.5335 4.5 7.5 4.5Z"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linejoin="round"
          />
          <path
            d="M14.5 4.75V8C14.5 8.55228 14.9477 9 15.5 9H18.25"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M8.75 11H15.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M8.75 14H15.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M8.75 17H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
      </span>
    </button>
  `}function zt(){const t=dt(),i=we(),n=i?.offsetWidth??350,a=i?.offsetHeight??520,r=Math.max(12,t.width-n-12),o=Math.max(12,t.height-a-12),c=t.width-n-20,s=80,g=I=>({left:m(I.left,12,r),top:m(I.top,12,o)});if(y)return g(y);if(w)return g({left:w.x+8,top:w.y+8});if(!O)return ki()?g({left:20,top:s}):g({left:c,top:s});const f=O.getBoundingClientRect(),F=f.right+16,$=f.left-n-16,T=f.left+f.width/2-n/2,M=F+n+12<=t.width?F:$>=12?$:m(T,12,r),X=m(f.top+Math.min(f.height*.12,24),12,o);return{left:M,top:X}}function nt(){const e=we();if(!e)return;const t=zt();e.style.left=`${t.left}px`,e.style.top=`${t.top}px`}function S(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Fn(e="base-url"){window.open(chrome.runtime.getURL(`options.html#${e}`),"_blank","noopener,noreferrer")}function Rt(){const e=u?.querySelector(".prompt-editor");if(e){if(e.classList.contains("json-view")){e.style.height="min(38vh, 300px)";return}e.style.height="0px",e.style.height=`${Math.max(e.scrollHeight,24)}px`}}function Lt(e){Q=e;const t=u?.querySelector(".prompt-editor");t&&(t.value=e,t.classList.toggle("typing",D),Rt())}function V(e){Pe!==null&&(window.clearTimeout(Pe),Pe=null),D=!1,typeof e=="string"&&(oe=e,Lt(e))}function Wn(e){V(),oe=e,Q=e,D=!0,Lt(e),Pe=window.setTimeout(()=>{D=!1,Lt(e),Pe=null},560)}function Gn(){const e=Ue();e&&window.requestAnimationFrame(()=>{Wn(e)})}function Un(){return`
    <div class="body">
      <div class="loading">
        <div class="progress-row">
          <div class="progress-track" aria-hidden="true">
            <div class="progress-bar" style="width:${v.toFixed(1)}%"></div>
          </div>
          <div class="progress-value">${Math.round(v)}%</div>
        </div>
        <p class="loading-status">${di()}...</p>
      </div>
    </div>
  `}function _i(){return`
    <div class="body">
      <p class="error-text">${S(l.error)}</p>
      <div class="helper">
        <button class="secondary-button" data-action="retry">${d.retry}</button>
        <button class="secondary-button" data-action="options">${d.openSettings}</button>
      </div>
    </div>
  `}function qn(){return`
    <div class="body">
      <div class="setup-shell">
        <p class="setup-copy">${d.apiSetupDescription}</p>
        <div class="setup-form">
          <label class="setup-field">
            <span class="setup-label">${d.apiSetupBaseUrl}</span>
            <input
              class="setup-input"
              data-api-field="base-url"
              type="url"
              spellcheck="false"
              value="${S(b.baseUrl)}"
              placeholder="${S(d.apiSetupBaseUrlPlaceholder)}"
            />
          </label>
          <label class="setup-field">
            <span class="setup-label">${d.apiSetupApiKey}</span>
            <input
              class="setup-input"
              data-api-field="api-key"
              type="password"
              spellcheck="false"
              value="${S(b.apiKey)}"
              placeholder="${S(d.apiSetupApiKeyPlaceholder)}"
            />
          </label>
          <label class="setup-field">
            <span class="setup-label">${d.apiSetupModel}</span>
            <input
              class="setup-input"
              data-api-field="model"
              type="text"
              spellcheck="false"
              value="${S(b.model)}"
              placeholder="${S(d.apiSetupModelPlaceholder)}"
            />
          </label>
        </div>
        ${b.error?`<p class="setup-error">${S(b.error)}</p>`:""}
        <div class="setup-actions">
          <button type="button" class="primary-button" data-action="save-api-setup" ${b.isSaving?"disabled":""}>
            ${b.isSaving?d.apiSetupSaving:d.apiSetupSave}
          </button>
        </div>
      </div>
    </div>
  `}function Bn(e){if(!l.analysis)return _i();const t=Ue()??"",n=Dn().slice(0,6).map(o=>`<span class="tag">${S(o)}</span>`).join(""),a=l.language==="json";return`
    <div class="body body-success${e}">
      <div class="scroll-area${a?" json-scroll":""}">
        <textarea class="prompt prompt-editor${`${D?" typing":""}${a?" json-view":""}`}" spellcheck="false">${S(Q||t)}</textarea>
      </div>
      <div class="success-meta">
        <div class="tags ${n?"":"hidden"}">${n}</div>
      </div>
    </div>
  `}function Ci(e){return`
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="${e==="up"?"M4 10L8 6L12 10":"M4 6L8 10L12 6"}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `}function Vn(){return`
    <div class="minimized-panel" data-drag-handle="true">
      <button
        type="button"
        class="minimized-toggle-card${C?" is-active":""}"
        data-action="toggle-inline-actions"
        aria-pressed="${C?"true":"false"}"
      >
        <span class="minimized-toggle-copy">
          <span class="minimized-toggle-title">${d.inlineActionsTitle}</span>
        </span>
        <span class="minimized-toggle-switch" aria-hidden="true"></span>
      </button>
      <div class="minimized-actions">
        <button
          type="button"
          class="minimized-icon-button is-danger"
          data-action="close-shared-panel"
          aria-label="${d.closeSharedPanel}"
        >×</button>
        <button
          type="button"
          class="minimized-icon-button is-expand"
          data-action="expand-panel"
          aria-label="${d.expandPanel}"
        >${Ci("down")}</button>
      </div>
    </div>
  `}function p(){if(!u)return;if(Wt(),kn(),l.status==="hidden"){u.innerHTML="";return}if(h==="minimized"){const $=zt();u.innerHTML=`
      <div
        class="panel-shell"
        style="left:${$.left}px; top:${$.top}px;"
      >
        <div
          class="panel is-minimized"
          role="dialog"
          aria-modal="false"
          aria-label="Image prompt minimized menu"
        >
          <div class="ring-glow" aria-hidden="true"></div>
          <div class="glass-pill"></div>
          ${Vn()}
        </div>
      </div>
    `,ai(),window.requestAnimationFrame(()=>{nt(),y||(y={...$})});return}const e=zt(),t=l.copied?`${d.copied}<span class="button-check" aria-hidden="true">&#10003;</span>`:d.copy,i=l.status==="success"&&U?" result-enter":"",n=l.status==="loading"?" loading-glow":Je?" copy-glow":"",a=l.status!=="setup"&&x,r=l.status==="success"?Nn():"",o="",c=l.status==="loading"?Un():l.status==="setup"?qn():l.status==="error"?_i():Bn(i),s=a?Ln():"",g=l.status==="loading"?" is-loading":"",f=l.status==="loading"||l.status==="success"?`<button class="close-button" data-action="close-shared-panel" aria-label="${d.closeSharedPanel}">×</button>`:`<button class="close-button" data-action="minimize-panel" aria-label="${d.minimizePanel}">${Ci("up")}</button>`,F=A!==null?` style="width:${Math.round(A)}px; min-width:${Math.round(A)}px; max-width:${Math.round(A)}px;"`:"";u.innerHTML=`
    <div
      class="panel-shell"
      style="left:${e.left}px; top:${e.top}px;"
    >
      <div
        class="panel${i}${n}"${F}
        role="dialog"
        aria-modal="false"
        aria-label="Image prompt analysis"
      >
        <div class="ring-glow" aria-hidden="true"></div>
        <div class="glass-pill"></div>
        <div class="panel-inner">
          <div class="header${g}" data-drag-handle="true">
            ${z?.src?`<div class="panel-thumb"><img src="${S(z.src)}" alt="" /></div>`:""}
            <div class="header-copy">
              <div class="eyebrow">MX-Insight</div>
              <div class="title-row">
                <div class="title">${l.status==="loading"?d.analysisImage:l.status==="setup"?d.apiSetupTitle:d.analysisResult}</div>
              </div>
            </div>
            <div class="header-actions">
              ${f}
              ${o}
            </div>
          </div>
          ${c}
          ${l.status==="success"?`<div class="footer${i}">
            ${r}
            <button type="button" class="primary-button" data-action="copy">${t}</button>
          </div>`:""}
        </div>
      </div>
      ${s}
    </div>
  `,ai(),U=!1,xe=!1,window.requestAnimationFrame(()=>{A===null?$i():Vt(),nt(),y||(y={...e}),Hi(),se!==null?Ii(se):ke(),l.status==="setup"&&Qn()})}function wt(e){return typeof e=="string"?e.trim():""}async function rt(){const e=await chrome.storage.local.get(Gi);return{baseUrl:wt(e.baseUrl),apiKey:wt(e.apiKey),model:wt(e.model)}}function $t(e){return!!(e.baseUrl&&e.apiKey&&e.model)}function at(e){return e.baseUrl?e.apiKey?e.model?"":"请先填写支持图片分析的模型名。":"请先填写接口密钥。":"请先填写接口地址。"}function Kn(e){return e instanceof Error?/Base URL|API Key|接口地址|接口密钥|模型名|模型名称/i.test(e.message):!1}async function Xn(e){await chrome.storage.local.set({baseUrl:e.baseUrl.trim(),apiKey:e.apiKey.trim(),model:e.model.trim()})}function Jn(){const e=u?.querySelector(".setup-error");e&&(e.textContent="")}function Zn(e,t){b[e]=t,b.error&&(b.error="",Jn())}function Qn(){const e=u?.querySelector('[data-api-field="base-url"]'),t=u?.querySelector('[data-api-field="api-key"]'),i=u?.querySelector('[data-api-field="model"]');((e&&!e.value.trim()?e:null)??(t&&!t.value.trim()?t:null)??(i&&!i.value.trim()?i:null)??e)?.focus()}async function Mt(e,t){const i=await rt();Ze=e,e.options?.historyPlaceholderId&&Ye(e.options.historyPlaceholderId),E=null,ce(),O=t?.anchor??O,z=t?.target??z,w=t?.point??w,y=null,A=null,h="expanded",ve(),R(),V(""),U=!1,b={baseUrl:i.baseUrl,apiKey:i.apiKey,model:i.model,error:t?.message??at(i),isSaving:!1},Y({status:"setup",analysis:null,error:"",copied:!1})}async function er(){const e=Ze;if(Ze=null,!e)return;let t=e.options;if(e.options?.autoSaveToHistory){let i=z;if((!i||e.srcUrl&&i.src!==e.srcUrl)&&e.srcUrl){const n=Kt(e.srcUrl);i=n instanceof HTMLImageElement?Dt(n):null}if(i){await de();const n=qt(i);t={...e.options,historyPlaceholderId:n.id}}}await We(e.srcUrl,e.preferLatest,t)}async function ri(){const e={baseUrl:b.baseUrl.trim(),apiKey:b.apiKey.trim(),model:b.model.trim()},t=at(e);if(t){b={...b,...e,error:t,isSaving:!1},p();return}b={...b,...e,error:"",isSaving:!0},p();try{await Xn(e),await er()}catch(i){b={...b,isSaving:!1,error:i instanceof Error?i.message:"保存设置失败，请稍后重试。"},Y({status:"setup",analysis:null,error:"",copied:!1})}}function Oi(){Te!==null&&(window.clearTimeout(Te),Te=null)}function Di(e){Oi(),Je=!0,e?.renderImmediately!==!1&&(Ne(),p()),Te=window.setTimeout(()=>{Te=null,Je=!1,Ne(),p()},1100)}function Fe(e){l={status:"hidden",language:"zh",analysis:null,error:"",copied:!1},Oi(),Ke(),It(),Je=!1,xe=!1,x=!1,Z=!1,ae="idle",pe=null,Ze=null,b={baseUrl:"",apiKey:"",model:"",error:"",isSaving:!1},je=null,Ct=new Set,_=null,Mi(),O=null,z=null,w=null,y=null,A=null,e?.preserveSessionMode||(h="hidden"),ve(),R(),V(""),U=!1,p()}function Y(e){l={...l,...e},p()}async function tr(){const e=Ue();e&&(await Ei(e),Ne(),Di({renderImmediately:!1}),Y({copied:!0}))}async function ir(){l.status!=="hidden"&&(he(),h="minimized",p(),await P("minimized"))}async function nr(){h="expanded",p(),await P("expanded")}async function rr(){C=!C,C?ee():L(),p(),await P(h)}async function ar(){l.status==="loading"&&(fe=Math.max(fe+1,Date.now()),E&&(Ye(E.placeholderId),E=null)),he(),He=N?.src??He,L(),await P("hidden"),Fe()}async function vt(e){const t=Ue();if(!t||ae==="opening")return;const i=e??le;le=i,he(),w=null,P(h),Et(),ae="opening",Z=!1,p();try{await Ei(t);const n=await chrome.runtime.sendMessage({type:"OPEN_GENERATOR_SITE",payload:{siteId:i,prompt:t}});if(!n.ok)throw new Error(n.error);Ne(),Di({renderImmediately:!1}),Y({copied:!0});const a=Ai(i).label;Ce(`${d.generatorCopiedToastPrefix}${a}${d.generatorFallbackToastSuffix}`,"success")}catch(n){Ce(n instanceof Error?n.message:d.generatorOpenError,"error")}finally{ae="idle",p()}}function mxTaskDelay(e){return new Promise(t=>window.setTimeout(t,e))}function mxShowTaskDone(e){if(!ue)return;const t=e?.record??{},i=t.imageSrc||e?.task?.imageSrc||"",n=e?.task?.title||t.pageUrl||"图片";ue.insertAdjacentHTML("beforeend",`
    <div class="task-complete-toast">
      ${i?`<img src="${S(i)}" alt="" />`:"<div></div>"}
      <div>
        <strong>反推完成</strong>
        <span>${S(n)}</span>
      </div>
    </div>
  `);const a=ue.lastElementChild;window.setTimeout(()=>a?.remove(),3800)}async function Ni(e){const t=await chrome.runtime.sendMessage({type:"RUN_ANALYSIS",payload:{target:e,background:!0}});if(!t.ok)throw new Error(t.error);const i=t.data?.taskId;if(!i)throw new Error("反推任务启动失败。");for(;;){await mxTaskDelay(1100);const n=await chrome.runtime.sendMessage({type:"GET_ANALYSIS_TASK",payload:{taskId:i}});if(!n.ok)throw new Error(n.error);const a=n.data?.task;typeof a?.progress=="number"&&(v=Math.max(v,Math.min(99,a.progress)),Ot());if(a?.status==="success"){mxShowTaskDone(n.data);if(n.data?.analysis)return n.data.analysis;if(n.data?.record?.analysis)return n.data.record.analysis;throw new Error("反推完成，但没有拿到结果。")}if(a?.status==="error")throw new Error(a.error||"分析失败，请稍后重试。")}}async function Yi(e,t,i){await de();const n=En(e,t);if(Ct.delete(n.id),i?.selectEntry&&(_=n.id),k=await cn(n),i?.revealHistory&&(xe=!x,x=!0),i?.animate){je=n.id;try{p(),await new Promise(a=>{window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>a())})}),await $n(n)}finally{je=null,p()}return n}return l.status!=="hidden"&&x&&p(),n}async function or(e){await de();const t=qt(e),i=l.status!=="hidden";i&&(xe=!x,x=!0,p());try{const n=await Ni(e);await xi(Ri(e,n)),Ye(t.id),await Yi(e,n,{revealHistory:i,animate:!1,selectEntry:!1})}catch(n){throw Ye(t.id),n}}async function sr(){if(!K)return;const e=q,t=N;if(!(!e||!t)){Qt(t.src,{promptStatus:"loading"});try{const i=await rt(),n=await rn(),a=await De(),r=!n||!a;if(G={element:e,target:t,point:be},B=!1,L(),!$t(i)){await We(t.src,!1,{autoSaveToHistory:!0,markInlinePromptOnboardingComplete:!n});return}if(r){await de();const o=qt(t);await We(t.src,!1,{autoSaveToHistory:!0,historyPlaceholderId:o.id,markInlinePromptOnboardingComplete:!n});return}await or(t),Ce(d.saveSuccessToast,"success")}finally{Qt(t.src,{promptStatus:"idle"})}}}async function lr(){if(!K)return;const e=q,t=N,i=be??null;B=!1,L();try{const n=await De();if(n){h="expanded",it(n,{preservePosition:!1,anchorPoint:i}),P("expanded");return}if(!e||!t){Ce(d.missingLatestAnalysis,"error");return}G={element:e,target:t,point:be},await We(t.src)}catch(n){Ce(n instanceof Error?n.message:"打开提示词卡片失败，请稍后重试。","error")}}async function cr(){await de(),x=!x,x&&!_&&k.length>0&&(_=k[0].id),p()}function dr(e){je!==e&&jn(e)}async function pr(e){await de(),k=await dn(e),Ct.delete(e),_===e&&(_=k[0]?.id??null),k.length===0&&(x=!1,_=null),p()}function ve(){st=null,Ee=null,we()?.classList.remove("dragging"),window.removeEventListener("pointermove",Fi),window.removeEventListener("pointerup",ot),window.removeEventListener("pointercancel",ot)}function Fi(e){st===e.pointerId&&(Ee&&Math.hypot(e.clientX-Ee.x,e.clientY-Ee.y)>4&&(jt=!0),y={left:e.clientX-At.x,top:e.clientY-At.y},nt())}function ot(e){st===e.pointerId&&(jt&&(si=Date.now()+220),ve(),h!=="hidden"&&l.status!=="loading"&&l.status!=="setup"&&P(h))}function ur(){const e=we(),t=u?.querySelector("[data-drag-handle='true']");!e||!t||(t.onpointerdown=i=>{const n=i.target;if(!(n instanceof Element)||n.closest("[data-action]")||i.button!==0)return;const a=e.getBoundingClientRect();st=i.pointerId,Ee={x:i.clientX,y:i.clientY},jt=!1,At={x:i.clientX-a.left,y:i.clientY-a.top},y={left:a.left,top:a.top},e.classList.add("dragging"),window.addEventListener("pointermove",Fi),window.addEventListener("pointerup",ot),window.addEventListener("pointercancel",ot),i.preventDefault()})}function ai(){if(!u)return;ur();u.querySelectorAll(".history-image-thumb,.panel-thumb img").forEach(o=>{o.onerror=()=>{o.style.visibility="hidden"}});const e=u.querySelector('[data-api-field="base-url"]'),t=u.querySelector('[data-api-field="api-key"]'),i=u.querySelector('[data-api-field="model"]'),n=(o,c)=>{o&&(o.oninput=()=>{Zn(c,o.value)},o.onkeydown=s=>{s.key==="Enter"&&(s.preventDefault(),ri())})};n(e,"baseUrl"),n(t,"apiKey"),n(i,"model");const a=u.querySelector(".prompt-editor");a&&(Rt(),a.oninput=()=>{D=!1,Q=a.value,oe=a.value,On(l.language,a.value),Bt(),Rt()});const r=u.querySelector("[data-language-select=\"true\"]");r&&(r.onchange=()=>{if(l.status!=="success")return;const o=wi(r.value);if(o===l.language)return;D=!1,oe="",Q="",Y({language:o,copied:!1}),P(h),Gn()});u.querySelectorAll("[data-action]").forEach(o=>{o.dataset.action==="open-generator-site-direct"&&(o.onpointerdown=async c=>{if(l.status!=="success"||ae==="opening")return;c.preventDefault(),c.stopPropagation(),Et();const s=tt(o.dataset.siteId);ii(s),await vt(s)},o.onkeydown=async c=>{if(c.key!=="Enter"&&c.key!==" "||l.status!=="success"||ae==="opening")return;c.preventDefault(),c.stopPropagation(),Et();const s=tt(o.dataset.siteId);ii(s),await vt(s)}),o.onclick=async c=>{if(Date.now()<si){c.preventDefault(),c.stopPropagation();return}const s=o.dataset.action;if(s==="minimize-panel"){await ir();return}if(s==="expand-panel"){await nr();return}if(s==="toggle-inline-actions"){await rr();return}if(s==="close-shared-panel"){await ar();return}if(s==="save-api-setup"&&l.status==="setup"){await ri();return}if(s==="switch-language"&&l.status==="success"){const g=wi(o.dataset.language);if(!o.dataset.language||g===l.language)return;D=!1,oe="",Q="",Y({language:g,copied:!1}),P(h),Gn();return}if(s==="toggle-history-rail"&&l.status==="success"){await cr();return}if(s==="close-history"){x=!1,p();return}if(s==="copy"&&l.status==="success"){await tr();return}if(s==="open-generator-site"&&l.status==="success"){if(ei()){c.preventDefault(),c.stopPropagation();return}await vt();return}if(s==="toggle-generator-menu"&&l.status==="success"){if(ei()){c.preventDefault(),c.stopPropagation();return}Z=!Z,p();return}if(s==="open-generator-site-direct"&&l.status==="success"){c.preventDefault(),c.stopPropagation();return}if(s==="toggle-history"){const g=o.dataset.historyId;g&&dr(g);return}if(s==="delete-history"){c.stopPropagation();const g=o.dataset.historyId;g&&await pr(g);return}if(s==="retry"&&z){await Wi(z,fe);return}if(s==="options"){try{await chrome.runtime.sendMessage({type:"OPEN_SETTINGS",payload:{focus:"base-url"}})}catch{Fn("base-url")}return}},o.dataset.action==="toggle-history"&&(o.onkeydown=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),o.click())})})}async function Wi(e,t){try{const i=await Ni(e),n=E?.requestId===t?E:null;if(t!==fe){n&&xt(t,!0);return}await Vi(),U=l.status==="loading";const a=ut(i,l.language);Ut({}),Q=a,oe=a,D=!1,h="expanded",he(),w=null,Y({status:"success",analysis:i,error:"",copied:!1}),Bt(),P("expanded"),n&&(n.markInlinePromptOnboardingComplete&&an(),xt(t,!1),await Yi(n.target,i,{revealHistory:!0,animate:!1,selectEntry:!0})),V(a);return}catch(i){const n=E?.requestId===t?E:null,a=!!xt(t,!1);if(t!==fe){a&&p();return}if(Kn(i)){await Mt({srcUrl:e.src,preferLatest:!1,options:n?{autoSaveToHistory:!0,markInlinePromptOnboardingComplete:n.markInlinePromptOnboardingComplete}:void 0},{target:e,anchor:O,point:w,message:i instanceof Error?i.message:"请先完成接口设置。"});return}R(),V(""),U=!1,h="expanded",he(),w=null,Y({status:"error",error:i instanceof Error?i.message:"分析失败，请稍后重试。",analysis:null,copied:!1}),P("expanded"),a&&p()}}function Kt(e){return e?Array.from(document.images).find(i=>i.currentSrc===e||i.src===e)??null:null}async function We(e,t=!1,i){if(!K){Fe({preserveSessionMode:!0});return}Z=!1,ae="idle";const n=Date.now();if(fe=n,E=null,t){const c=await De();if(c){w=null,it(c),P("expanded");return}}let a=G.element,r=G.target;if((!r||e&&r.src!==e)&&(a=Kt(e),r=a instanceof HTMLImageElement?Dt(a):null),!r){i?.historyPlaceholderId&&Ye(i.historyPlaceholderId);const c=await De();if(c){w=null,it(c),P("expanded");return}const s=await rt();if(!$t(s)){await Mt({srcUrl:e,preferLatest:t,options:i},{target:null,anchor:null,point:G.point,message:at(s)});return}ce(),O=null,z=null,w=G.point,y=null,A=null,h="expanded",R(),Y({status:"error",language:"zh",analysis:null,error:e?d.missingImage:d.missingLatestAnalysis,copied:!1}),P("expanded");return}const o=await rt();if(!$t(o)){await Mt({srcUrl:e,preferLatest:t,options:i},{target:r,anchor:a,point:G.point,message:at(o)});return}ce(),Mi(),O=a,z=r,w=G.point,y=null,A=null,h="expanded",ve(),V(""),U=!1,i?.autoSaveToHistory&&i.historyPlaceholderId&&(E={requestId:n,target:r,placeholderId:i.historyPlaceholderId,markInlinePromptOnboardingComplete:i.markInlinePromptOnboardingComplete===!0}),Bi(),Y({status:"loading",language:"zh",analysis:null,error:"",copied:!1}),await Wi(r,n)}function gr(e){if(ct()){L();return}if(!K||!C){L();return}if(e.pointerType==="touch"){L();return}const t=e.target;if(t instanceof Element&&t.closest("#imagetoprompt-root")){Ge();return}const i={x:e.clientX,y:e.clientY};if(be=i,B)return;const n=ui(e.target,i);if(He)if(!n.target||n.target.src!==He)He=null;else{Oe();return}if(!n.element||!n.target||!Nt(n.element)){Oe();return}ce(),on(n.element,n.target,i)}function fr(){B||Oe()}function gt(){Wt(),l.status!=="hidden"&&(Vt(),nt(),Hi()),pt()}document.addEventListener("contextmenu",e=>{G=ui(e.target,{x:e.clientX,y:e.clientY})},!0);document.addEventListener("pointermove",gr,!0);document.addEventListener("pointerleave",fr,!0);document.addEventListener("pointerdown",e=>{const t=e.target;Z&&(!(t instanceof Element)||!t.closest(".generator-action-group"))&&window.setTimeout(()=>{Z&&(Z=!1,p())},0),!(t instanceof Element&&(t.closest("#imagetoprompt-root")||t.closest("[data-inline-action]")))&&(B||Oe())},!0);window.addEventListener("scroll",gt,!0);window.addEventListener("resize",gt);window.visualViewport?.addEventListener("resize",gt);window.visualViewport?.addEventListener("scroll",gt);chrome.runtime.onMessage.addListener((e,t,i)=>e.type==="OPEN_PANEL"?((async()=>{try{await We(e.payload?.srcUrl,e.payload?.preferLatest===!0),i({ok:!0,data:{opened:!0}})}catch(n){i({ok:!1,error:n instanceof Error?n.message:"打开面板失败。"})}})(),!0):(e.type==="AUTOFILL_GENERATOR_PROMPT"&&e.payload?.siteId&&typeof e.payload.prompt=="string"&&typeof e.payload.requestId=="string"&&(Ti({siteId:e.payload.siteId,prompt:e.payload.prompt,requestId:e.payload.requestId}),i({ok:!0,data:{accepted:!0}})),!1));chrome.storage.onChanged.addListener((e,t)=>{if(t==="local"){if(Object.prototype.hasOwnProperty.call(e,ze)){const i=e[ze]?.newValue;Tt(typeof i=="boolean"?i:!0)}if(Object.prototype.hasOwnProperty.call(e,Le)){const i=e[Le]?.newValue;le=tt(i),l.status==="success"&&p()}if(Object.prototype.hasOwnProperty.call(e,Me)&&(_e=e[Me]?.newValue===!0,lt=!0),Object.prototype.hasOwnProperty.call(e,$e)){const i=vi(e[$e]?.newValue);Si(i),ee(),Ht()}Object.prototype.hasOwnProperty.call(e,et)&&h!=="hidden"&&Ht()}});Promise.all([mn(),bn(),mi()]);
