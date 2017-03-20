using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VHaving.BackOfficeWeb.Startup))]
namespace VHaving.BackOfficeWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
