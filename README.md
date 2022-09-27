# melon-spfx

## Summary

Процедура при инсталиране на решението в SPO:
- Отваряме Windows Powershell като "Administrator"

- Инсталираме powershell модул за работа O365 (SharePoint Online, Microsoft Teams, Microsoft Planner and Microsoft Flow)
- Install-Module -Name "PnP.PowerShell"3)  Свързване с App Catalog сайт колекцията в SharePoint Online
- Connect-PnPOnline -Url https://yourdomain.sharepoint.com/sites/yourSiteCollectionAppCatalog
- При появата на тази грешка: Connect-PnPOnline : AADSTS65001: The user or administrator has not consented to use the application with ID
'31359c7f-bd7e-475c-86db-fdb8c937548e' named 'PnP Management Shell'. Send an interactive authorization request for
this user and resource.
- Се изпълнява следната команда: Register-PnPManagementShellAccess
- Добавяне на решението в App Catalog-a
- Add-PnPApp -Path "C:\Users\...\MelonSPFX\sharepoint\solution\melon-spfx.sppkg"5) 
-  Деплойване на решението 
-  Publish-PnPApp -Identity e8ab6c4f-d534-4c4b-b391-54d64bbfc489 -SkipFeatureDeploymente
-  8ab6c4f-d534-4c4b-b391-54d64bbfc489 (You can find the ID of your solution on the package-solution.json file)

- Инсталиране на решението в определена сайт колекция:
-  Connect-PnPOnline -Url https://yourdomain.sharepoint.com/sites/targetSiteCollection
-   Install-PnPApp -Identity e8ab6c4f-d534-4c4b-b391-54d64bbfc489

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
