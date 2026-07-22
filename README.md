# About

[![Build status](https://github.com/rgl/hello-world-electron/workflows/Build/badge.svg)](https://github.com/rgl/hello-world-electron/actions?query=workflow%3ABuild)

The classic Hello World. Electron flavoured.

## Develop

Install [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/).

Install [Chocolatey](https://chocolatey.org/install).

Install [MSYS2](https://community.chocolatey.org/packages/msys2) and [Node.js](https://community.chocolatey.org/packages/nodejs):

```batch
choco install -y msys2 --params="'/NoPath'"
choco install -y nodejs
```

Execute the following commands in a MSYS2 `bash` session.

Install the dependencies:

```bash
winget install --exact --id MichalTrojnara.osslsigncode
```

To use the updated `PATH` environment variable, which will now include the
newly installed applications, exit the shell session, and open a new one.

Build and package:

```bash
make dist
```

**NB** This also creates an example code signing certification authority and
uses it to sign the binaries.

List the dist app contents, and confirm it has the expected files:

```bash
npx asar list dist/win-unpacked/resources/app.asar
```

Verify the code signature:

```bash
osslsigncode verify \
    -in dist/win-unpacked/hello-world-electron.exe \
    -CAfile example-code-signing-ca-crt.pem
osslsigncode verify \
    -in dist/hello-world-electron-setup-1.3.0.exe \
    -CAfile example-code-signing-ca-crt.pem
osslsigncode verify \
    -in dist/hello-world-electron-1.3.0.msi \
    -CAfile example-code-signing-ca-crt.pem
```

Show the code signature:

**NB** The signature verification will fail when your host does not trust the
`example-code-signing` CA.

```bash
pwsh -Command 'Import-Certificate example-code-signing-ca-crt.pem -CertStoreLocation Cert:/LocalMachine/Root'
pwsh -Command 'Get-AuthenticodeSignature dist/win-unpacked/hello-world-electron.exe | Format-List'
pwsh -Command 'Get-AuthenticodeSignature dist/hello-world-electron-setup-1.3.0.exe | Format-List'
pwsh -Command 'Get-AuthenticodeSignature dist/hello-world-electron-1.3.0.msi | Format-List'
```

## References

* [WiX: Errors running validation](https://docs.firegiant.com/wix/tools/validation/#errors-running-validation)
    * `electron-builder`, to build the `msi`, uses [WiX](https://github.com/wixtoolset/wix), which requires administrator-level privileges. For more information see:
        * [Errors running validation](https://docs.firegiant.com/wix/tools/validation/#errors-running-validation).
        * [MSI package validation](https://learn.microsoft.com/en-us/windows/win32/msi/package-validation).
        * [`wix msi validate`](https://docs.firegiant.com/wix/tools/wixexe/#msivalidate).
    * To disable the validation, edit `package.json`, and modify the `build.msi.additionalLightArgs` property to use the `-sval` (aka skip validation) argument, e.g.:
        ```json
        {
            "build": {
                "msi": {
                    "additionalLightArgs": ["-sval"]
                }
            }
        }
        ```
* [electron.svg](https://thesvg.org/icon/electron)
* [osslsigncode](https://github.com/mtrojnar/osslsigncode)
