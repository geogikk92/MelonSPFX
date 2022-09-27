import * as React from 'react';
import {
    DefaultButton, Dropdown, FocusTrapZone, IDropdownOption,
    IIconProps, IStackTokens, Layer, mergeStyleSets, MessageBar,
    MessageBarType, Overlay, Popup, PrimaryButton, Stack
} from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

const popupStyles = mergeStyleSets({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '0',
        left: '0',
        position: 'fixed',
        right: '0',
        top: '0',
    },
    content: {
        background: 'white',
        left: '50%',
        maxWidth: '400px',
        padding: '0 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export interface IHelloMelonProps {
    buttonText: string;
    savebtnText: string;
    cancelBtnText: string;
    errorText: string;
    spcontext: WebPartContext;
}

export interface IHelloMelonState {
    language: IDropdownOption;
    isPopupVisible: boolean;
    showError: boolean;
}

const langOptions: IDropdownOption[] = [
    { key: 'English.aspx', text: 'English' },
    { key: 'Bulgarian.aspx', text: 'Bulgarian' },
    { key: 'Spanish.aspx', text: 'Spanish' },
    { key: 'Italian.aspx', text: 'Italian' }
];

const currentPage = window.location.href;

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };
const langIcon: IIconProps = { iconName: 'LocaleLanguage' };

export default class HelloMelon extends React.Component<IHelloMelonProps, IHelloMelonState> {
    constructor(props: IHelloMelonProps) {
        super(props);
        this.state = {
            language: this.setDefaultValue(),
            //StatUp Page
            isPopupVisible: window.location.href.toLowerCase().indexOf('/home.aspx') > 1,
            showError: false,
        };
    }

    public render(): React.ReactElement<IHelloMelonProps> {
        return (
            <div>
                {
                    (window.location.href.toLowerCase().indexOf('/home.aspx') === -1) ?
                        <DefaultButton iconProps={langIcon} text={this.props.buttonText} onClick={this._onClick_ShowPop.bind(this)} />
                        : null
                }
                {
                    (this.state.isPopupVisible) ?
                        <Layer>
                            <Popup
                                className={popupStyles.root}
                                role="dialog"
                                aria-modal="true"
                                enableAriaHiddenSiblings={true}
                            >
                                <Overlay onClick={this._onClick_ClosePop} />
                                <FocusTrapZone>
                                    <div role="document" className={popupStyles.content}>
                                        <p>
                                            <Dropdown
                                                placeholder="Select an option"
                                                label={this.props.buttonText}
                                                required
                                                options={langOptions}
                                                defaultSelectedKey={this.state.language.key}
                                                onChanged={selectedOption => {
                                                    this.setOption(selectedOption);
                                                }}
                                            />
                                        </p>
                                        {
                                            (this.state.showError) ?
                                                <p>
                                                    <MessageBar
                                                        messageBarType={MessageBarType.error}
                                                        isMultiline={false}
                                                        dismissButtonAriaLabel="Close"
                                                    >
                                                        {this.props.errorText}
                                                    </MessageBar>
                                                </p>
                                                : null}
                                        <Stack horizontal tokens={stackTokens}>
                                            <PrimaryButton text={this.props.savebtnText} onClick={this._onSave_Lang.bind(this)} />
                                            <DefaultButton text={this.props.cancelBtnText} onClick={this._onClick_ClosePop.bind(this)} />
                                        </Stack>
                                    </div>
                                </FocusTrapZone>
                            </Popup>
                        </Layer>
                        : null
                }
            </div>
        );
    }

    private setDefaultValue(): IDropdownOption {
        let result: IDropdownOption = { key: '', text: '' };

        try {
            if (currentPage.toLowerCase().indexOf('/english.aspx') > 1)
                result = { key: 'English.aspx', text: 'English' }

            if (currentPage.toLowerCase().indexOf('/bulgarian.aspx') > 1)
                result = { key: 'Bulgarian.aspx', text: 'Bulgarian' }

            if (currentPage.toLowerCase().indexOf('/spanish.aspx') > 1)
                result = { key: 'Spanish.aspx', text: 'Spanish' }

            if (currentPage.toLowerCase().indexOf('/italian.aspx') > 1)
                result = { key: 'Italian.aspx', text: 'Italian' }
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    private setOption(langItem: IDropdownOption): void {
        try {
            this.setState((prevState: IHelloMelonState): IHelloMelonState => {
                prevState.language = { key: langItem.key, text: langItem.text };
                return prevState;
            });
        }
        catch (ex) {
            console.log(ex);
        }
    }

    private _onSave_Lang(ev: any): void {
        try {
            let currentPage = window.location.href

            if (currentPage.toLowerCase().indexOf(this.state.language.key.toString().toLowerCase()) > 1) {
                this.setState({ isPopupVisible: false });
                return;
            }

            if (!this.state.language.text) {
                this.setState({ showError: true });
                return;
            } else {
                this.setState({ showError: false });
            }

            window.open(`${this.props.spcontext.pageContext.web.absoluteUrl}/SitePages/${this.state.language.key}`, "_self")
            this.setState((prevState: IHelloMelonState): IHelloMelonState => {
                prevState.isPopupVisible = false;
                return prevState;
            });
        }
        catch (ex) {
            console.log(ex);
        }
    }

    private _onClick_ShowPop(ev: any): void {
        try {
            this.setState((prevState: IHelloMelonState): IHelloMelonState => {
                prevState.isPopupVisible = true;
                return prevState;
            });
        }
        catch (ex) {
            console.log(ex);
        }
    }

    private _onClick_ClosePop(ev: any): void {
        try {
            this.setState((prevState: IHelloMelonState): IHelloMelonState => {
                prevState.isPopupVisible = false;
                return prevState;
            });
        }
        catch (ex) {
            console.log(ex);
        }
    }
}