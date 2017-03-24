﻿var moduleName = 'virtoCommerce.productRecommendationsModule';

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
.run(['$state', 'platformWebApp.bladeNavigationService', 'platformWebApp.widgetService', 'platformWebApp.pushNotificationTemplateResolver', function ($state, bladeNavigationService, widgetService, pushNotificationTemplateResolver) {
    widgetService.registerWidget({
        controller: 'virtoCommerce.productRecommendationsModule.storeRecommendationsWidgetController',
        template: 'Modules/$(VirtoCommerce.ProductRecommendations)/Scripts/widgets/store-recommendations-widget.tpl.html'
    }, 'storeDetail');

    var menuExportTemplate =
            {
                priority: 900,
                satisfy: function (notify, place) { return place == 'menu' && notify.notifyType == 'CatalogPrepatedForRecommendationsCsvExport'; },
                template: 'Modules/$(VirtoCommerce.ProductRecommendations)/Scripts/blades/notifications/menuExport.tpl.html',
                action: function (notify) { $state.go('workspace.pushNotificationsHistory', notify) }
            };
    pushNotificationTemplateResolver.register(menuExportTemplate);

    var historyExportTemplate =
      {
          priority: 900,
          satisfy: function (notify, place) { return place == 'history' && notify.notifyType == 'CatalogPrepatedForRecommendationsCsvExport'; },
          template: 'Modules/$(VirtoCommerce.ProductRecommendations)/Scripts/blades/notifications/historyExport.tpl.html',
          action: function (notify) {
              var blade = {
                  id: 'catalogPreparedForRecommendationsExport',
                  title: 'productRecommendationsModule.blades.catalogExport.title',
                  controller: 'virtoCommerce.productRecommendationsModule.exportController',
                  template: 'Modules/$(VirtoCommerce.ProductRecommendations)/Scripts/blades/export.tpl.html',
                  notification: notify
              };
              bladeNavigationService.showBlade(blade);
          }
      };
    pushNotificationTemplateResolver.register(historyExportTemplate);
}]);