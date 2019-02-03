// @flow
import { app, Menu, shell, BrowserWindow, dialog } from 'electron';
const pjson = require('./package.json');


export default class MenuBuilder {
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
    }

    buildMenu() {
        if (
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
        ) {
            this.setupDevelopmentEnvironment();
        }

        const template =
            process.platform === 'darwin'
                ? this.buildDarwinTemplate()
                : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    setupDevelopmentEnvironment() {
        this.mainWindow.webContents.on('context-menu', (e, props) => {
            const { x, y } = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.inspectElement(x, y);
                    }
                }
            ]).popup(this.mainWindow);
        });
    }

    buildDarwinTemplate() {
        const subMenuAbout = {
            label: 'PrISM',
            submenu: [
                {
                    label: 'About PrISM',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                { type: 'separator' },
                { label: 'Services', submenu: [] },
                { type: 'separator' },
                {
                    label: 'Hide PrISM',
                    accelerator: 'Command+H',
                    selector: 'hide:'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:'
                },
                { label: 'Show All', selector: 'unhideAllApplications:' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        };
        const subMenuFile = {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'Command+N'
                },
                {
                    label: 'Open',
                    accelerator: 'Command+O'
                },
                { type: 'separator' },
                {
                    label: 'Save',
                    accelerator: 'Command+S'
                },
                {
                    label: 'Save As',
                    accelerator: 'Command+Shift+S'
                },
                { type: 'separator' },
                {
                    label: 'Generate PDF Report',
                    accelerator: 'Command+Shift+E',
                    click: () => {
                        this.mainWindow.webContents.send('SAVE_PDF');
                    }
                },
                {
                    label: 'Export Data',
                    click: () => {
                        this.mainWindow.webContents.send('EXPORT');
                    }
                },
                {
                    label: 'Import Data',
                    click: () => {
                        dialog.showOpenDialog({
                            properties: ["openFile"]
                        }, (files) => {
                            if (files !== undefined) {
                                this.mainWindow.webContents.send('IMPORT', files);
                            }
                        })
                    }
                }
            ]
        }
        const subMenuEdit = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
                { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
                { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:'
                }
            ]
        };
        const subMenuViewDev = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        this.mainWindow.webContents.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        this.mainWindow.toggleDevTools();
                    }
                }
            ]
        };
        const subMenuViewProd = {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                    }
                }
            ]
        };
        const subMenuResources = {
            label: 'Resources',
            submenu: [
                {
                    label: '1. Chemical Inventory',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource1-chemical-inventory.md');
                    }
                },
                {
                    label: '2. Chemical Hazard Assessment',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource2-chemical-hazard-assessment.md');
                    }
                },
                {
                    label: '3. Exposure Assessment',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource3-exposure-assessment.md');
                    }
                },
                {
                    label: '4. Stakeholder Considerations and Social Impacts',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource4-stakeholder-considerations-and-social-impacts.md');
                    }
                },
                {
                    label: '5. Social and Environmental Justice',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource5-social-and-env-justice.md');
                    }
                },
                {
                    label: '6. Life Cycle Considerations',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource6-life-cycle-assessment.md');
                    }
                },
                {
                    label: '7. Decision Analysis',
                    click() {
                        shell.openExternal('https://github.com/NorthwestGreenChemistry/PrISM/blob/develop/app/content/resource7-decision-analysis.md');
                    }
                }
            ]
        };

        const subMenuWindow = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:'
                },
                { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
                { type: 'separator' },
                { label: 'Bring All to Front', selector: 'arrangeInFront:' }
            ]
        };
        const subMenuHelp = {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click() {
                        dialog.showMessageBox(null, {
                            type:'info',
                            buttons: ['Ok'],
                            defaultId: 0,
                            title:'hey',
                            message: pjson.productName,
                            detail: 'Version: ' + pjson.version +
                                    '\nDescription: ' + pjson.description
                        });
                    }
                },
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('http://electron.atom.io');
                    }
                },
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal(
                            'https://github.com/atom/electron/tree/master/docs#readme'
                        );
                    }
                },
                {
                    label: 'Community Discussions',
                    click() {
                        shell.openExternal('https://discuss.atom.io/c/electron');
                    }
                },
                {
                    label: 'Search Issues',
                    click() {
                        shell.openExternal('https://github.com/atom/electron/issues');
                    }
                }
            ]
        };

        const subMenuView =
            process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

        return [subMenuAbout, subMenuFile, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp, subMenuResources];
    }

    buildDefaultTemplate() {
        const templateDefault = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O'
                    },
                    {
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click: () => {
                            this.mainWindow.close();
                        }
                    }
                ]
            },
            {
                label: '&View',
                submenu:
                    process.env.NODE_ENV === 'development'
                        ? [
                                {
                                    label: '&Reload',
                                    accelerator: 'Ctrl+R',
                                    click: () => {
                                        this.mainWindow.webContents.reload();
                                    }
                                },
                                {
                                    label: 'Toggle &Full Screen',
                                    accelerator: 'F11',
                                    click: () => {
                                        this.mainWindow.setFullScreen(
                                            !this.mainWindow.isFullScreen()
                                        );
                                    }
                                },
                                {
                                    label: 'Toggle &Developer Tools',
                                    accelerator: 'Alt+Ctrl+I',
                                    click: () => {
                                        this.mainWindow.toggleDevTools();
                                    }
                                }
                            ]
                        : [
                                {
                                    label: 'Toggle &Full Screen',
                                    accelerator: 'F11',
                                    click: () => {
                                        this.mainWindow.setFullScreen(
                                            !this.mainWindow.isFullScreen()
                                        );
                                    }
                                }
                            ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            shell.openExternal('http://electron.atom.io');
                        }
                    },
                    {
                        label: 'Documentation',
                        click() {
                            shell.openExternal(
                                'https://github.com/atom/electron/tree/master/docs#readme'
                            );
                        }
                    },
                    {
                        label: 'Community Discussions',
                        click() {
                            shell.openExternal('https://discuss.atom.io/c/electron');
                        }
                    },
                    {
                        label: 'Search Issues',
                        click() {
                            shell.openExternal('https://github.com/atom/electron/issues');
                        }
                    }
                ]
            }
        ];

        return templateDefault;
    }
}
