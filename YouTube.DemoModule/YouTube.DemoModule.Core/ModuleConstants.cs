using System.Collections.Generic;
using VirtoCommerce.Platform.Core.Settings;

namespace YouTube.DemoModule.Core
{
    public static class ModuleConstants
    {
        public static class Security
        {
            public static class Permissions
            {
                public const string Access = "youTubeDemoModule:access";
                public const string Create = "youTubeDemoModule:create";
                public const string Read = "youTubeDemoModule:read";
                public const string Update = "youTubeDemoModule:update";
                public const string Delete = "youTubeDemoModule:delete";

                public static string[] AllPermissions { get; } = { Read, Create, Access, Update, Delete };
            }
        }

        public static class Settings
        {
            public static class General
            {
                public static SettingDescriptor YouTubeDemoModuleEnabled { get; } = new SettingDescriptor
                {
                    Name = "YouTubeDemoModule.YouTubeDemoModuleEnabled",
                    GroupName = "YouTubeDemoModule|General",
                    ValueType = SettingValueType.Boolean,
                    DefaultValue = false
                };

                public static SettingDescriptor YouTubeDemoModulePassword { get; } = new SettingDescriptor
                {
                    Name = "YouTubeDemoModule.YouTubeDemoModulePassword",
                    GroupName = "YouTubeDemoModule|Advanced",
                    ValueType = SettingValueType.SecureString,
                    DefaultValue = "qwerty"
                };

                public static IEnumerable<SettingDescriptor> AllSettings
                {
                    get
                    {
                        yield return YouTubeDemoModuleEnabled;
                        yield return YouTubeDemoModulePassword;
                    }
                }
            }

            public static IEnumerable<SettingDescriptor> AllSettings
            {
                get
                {
                    return General.AllSettings;
                }
            }
        }
    }
}
