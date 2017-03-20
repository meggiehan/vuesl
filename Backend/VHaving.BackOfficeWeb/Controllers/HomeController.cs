using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MiRai.Core;
using VHaving.Core.AppMaster.UserAdmin;
using VHaving.BackOfficeWeb.Models;
using System.Threading.Tasks;

namespace VHaving.BackOfficeWeb.Controllers
{
    public class HomeController : Controller
    {
        private ConnBus _conn = null;

        public HomeController()
        {
            CreateConn();
        }

        private int CreateConn()
        {
            int ret = 0;
            string connStr = "Password=123456;"
                + "Persist Security Info=True;"
                + "User ID=root;"
                + "Initial Catalog=ECManager;"
                + "Data Source=192.168.2.23";
            _conn = new ConnBus(connStr, DbProvider.MySql);
            _conn.IsReadDvPolicy = false;
            _conn.Open();
            return ret;
        }

        [HttpPost]
        public async Task<ActionResult> Index(UserLogin model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
   

            string email = Request.Form["Email"];

            string phone = Request.Form["Phone"];
            string password = Request.Form["Password"];
            string Prop1 = Request.Form["Prop1"];
            string Prop2 = Request.Form["Prop2"];
            string Prop3 = Request.Form["Prop3"];
            string Prop4 = Request.Form["Prop4"];
            string Status = Request.Form["Status"];
            string DispIndex = Request.Form["DispIndex"];

            email = "123";
            phone = "123";
            password = "123";
            Prop1 = "123";
            Prop2 = "123";
            Prop3 = "123";
            Prop4 = "123";
            email = model.Email;

            UserLoginManager UserLoginManager = new UserLoginManager(_conn);
            var UserLogin = new UserLogin();
            UserLogin.Password = "111111";
            UserLogin.Email = email;
            UserLogin.Phone = phone;
            UserLogin.IsAuthentication = false;
            UserLogin.Prop1 = Prop1;
            UserLogin.Prop2 = Prop2;
            UserLogin.Prop3 = Prop3;
            UserLogin.Prop4 = Prop4;
            //UserLogin.Status = Status;
            //UserLogin.DispIndex = DispIndex;
            UserLoginManager.UserLogin = UserLogin;
            var ret = UserLoginManager.Create();
            if (ret != 0) {
                ViewBag.Message = "失败！";
            }
            else
            {
                ViewBag.Message = "成功！";
            }
            return View();
        }

        public ActionResult About()
        {
            UserLoginManager UserLoginManager = new UserLoginManager(_conn);
            UserLoginManager.UserLogin = new UserLogin
            {
                Password = "111",
                Email = "111",
                Phone = "123",
                IsAuthentication = false,
                Prop1 = "111",
                Prop2 = "111",
                Prop3 = "111",
                Prop4 = "111",
            };
            return View(UserLoginManager.UserLogin);

            //ViewBag.Message = "Your application description page.";

            //return View();
        }

        public ActionResult Contact()
        {
            //1 ViewData传值
            ViewData["name1"] = "张三";
            //2 ViewBag.name
            ViewBag.name = "李四";
            //3.TempData["name"] 
            TempData["name"] = "王五";
            //4 view传值直接
            //PersonViewModel model = new PersonViewModel() { Name = "赵六", Age = 18 };
            //return View(model);

            //@using _06Mvc.Models;

            //< h2 > mvc传值 </ h2 >
            //< br />
            //< h4 > 第一种方式ViewData["xxx"] </ h4 >
            //ViewData["name1"]:@ViewData["name1"]
            //< hr />
            //< h4 > 第二种方式ViewBag.自定义名称 </ h4 >
            //ViewBag.name:@ViewBag.name
            //< hr />
            //< h4 > 第三种方式TempData["name"] </ h4 >
            //TempData["name"]:@TempData["name"]
            //< hr />
            //< h4 > 第四种方式View(model) </ h4 >
            //@{
            //  var res = "名称：" + Model.Name + "：" + "年龄：" + Model.Age;
            //@:变量res的值为： @res
            //}

            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}