/**
 * chrome-dev
 * Author: snomiao <snomiao@gmail.com>
 */
export default function chromeDev({ inputs, extension, openExtensionPage, devtools, ignoreHTTPSErrors, ignoreDefaultArgs, port, dotenv, ...otherArgs }?: {
    inputs?: string[];
    extension?: string;
    openExtensionPage?: boolean;
    devtools?: boolean;
    ignoreHTTPSErrors?: boolean;
    ignoreDefaultArgs?: boolean;
    port?: number;
    dotenv?: boolean;
}): Promise<void>;
//# sourceMappingURL=index.d.ts.map