using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using MiRai.Core;
using VHaving.Core.AppMaster.UserAdmin;
using VHaving.Core.AppQuery.UserAdmin;
using System.Web.Script.Serialization;

namespace VHaving.BackOfficeWeb.Controllers
{
    public class ManageController : CommonController
    {
        private int ret = 0;

        #region ConnDB
        private ConnBus _conn = null;

        //public ManageController()
        //{
        //    CreateConn();
        //}

        //private int CreateConn()
        //{
        //    int ret = 0;
        //    string connStr = "Password=123456;"
        //        + "Persist Security Info=True;"
        //        + "User ID=root;"
        //        + "Initial Catalog=ECManager;"
        //        + "Data Source=192.168.2.23";
        //    _conn = new ConnBus(connStr, DbProvider.MySql);
        //    _conn.IsReadDvPolicy = false;
        //    _conn.Open();
        //    return ret;
        //}
        #endregion

        #region Function
        public ActionResult Department()
        {
            return View();
        }
        public ActionResult Gys()
        {
            return View();
        }
        public ActionResult Menu()
        {
            return View();
        }
        public ActionResult Role()
        {
            return View();
        }
        














        /// <summary>
        /// 用户列表
        /// </summary>
        /// <returns></returns>
        public ActionResult User()
        {
            JavaScriptSerializer serialize = new JavaScriptSerializer();
            UserAdminQuery UserAdminQuery = new UserAdminQuery(_conn);
            DataTable retsult = UserAdminQuery.QueryAdmin();
            //ActionResult result = serialize.Serialize(retsult);
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 创建用户
        /// </summary>
        /// <returns></returns>
        public int CreateAdmin()
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
            ret = UserLoginManager.CreateAdmin();
            return ret;
        }

        /// <summary>
        /// 编辑用户
        /// </summary>
        /// <returns></returns>
        public int EditAdmin()
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
            ret = UserLoginManager.EditAdmin();
            return ret;
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <returns></returns>
        public int DelAdmin()
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
            ret = UserLoginManager.DelAdmin();
            return ret;
        }
        #endregion

    }
}