<?php
declare(strict_types=1);

namespace StudioMitte\SpeechInput\Hooks;

use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class ButtonBarHook
{

    /**
     * @param array $params
     * @param ButtonBar $buttonBar
     * @return array
     */
    public function getButtons(array $params, ButtonBar $buttonBar): array
    {
        $buttons = $params['buttons'];
        if (!$this->isValid()) {
            return $buttons;
        }
        $iconFactory = GeneralUtility::makeInstance(IconFactory::class);

        $button = $buttonBar->makeLinkButton();
        $button->setIcon($iconFactory->getIcon('ext-speechinput-action', Icon::SIZE_SMALL));
        $button->setTitle('input');
        $button->setHref('javascript:void(1)');
        $button->setClasses('speech-action');
        $buttons[ButtonBar::BUTTON_POSITION_RIGHT][2][] = $button;

        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->loadRequireJsModule('TYPO3/CMS/SpeechInput/SpeechInput');
        $pageRenderer->addCssFile('EXT:speech_input/Resources/Public/Styles/Styles.css');

        return $buttons;
    }

    protected function isValid(): bool
    {
        $route = GeneralUtility::_GET('route');
        return $route === '/record/edit';
    }
}
