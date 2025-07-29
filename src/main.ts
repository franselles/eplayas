import { enableProdMode, importProvidersFrom } from "@angular/core";

import { environment } from "./environments/environment";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { CoreModule } from "./app/core/core.module";
import { CoreComponent } from "./app/core/core.component";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(CoreComponent, {
    providers: [importProvidersFrom(BrowserModule, CoreModule)]
})
    .catch((err) => console.log(err));
