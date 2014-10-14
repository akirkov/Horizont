namespace Horizont.Web
{
    using System;
    using System.IO;
    using System.Net;
    using System.Web;

    public class RecaptchaValidation
    {
        private string challenge, response, privateKey, ip;

        public RecaptchaValidation(string clientIP, string privateKey, string challenge, string response)
        {
            this.ip = clientIP;
            this.privateKey = privateKey;
            this.challenge = challenge;
            this.response = response;
        }

        private bool _errored;
        public bool IsErrored
        {
            get
            {
                return _errored;
            }
        }

        private Exception _ex;
        public Exception Exception
        {
            get
            {
                return _ex;
            }
        }

        private string _vr;
        public string ValidationResult
        {
            get
            {
                return _vr;
            }
        }

        public bool Validate()
        {
            try
            {
                string post = "privatekey=" + HttpUtility.UrlEncode(privateKey) +
                             "&remoteip=" + HttpUtility.UrlEncode(ip) + "&challenge=" +
                             HttpUtility.UrlEncode(challenge) + "&response=" +
                             HttpUtility.UrlEncode(response);

                WebRequest wr = HttpWebRequest.Create ("http://www.google.com/recaptcha/api/verify");
                wr.Method = "POST";
                wr.ContentLength = post.Length;
                wr.ContentType = "application/x-www-form-urlencoded";

                using (StreamWriter sw = new StreamWriter(wr.GetRequestStream()))
                {
                    sw.Write(post);
                    sw.Close();
                }

                HttpWebResponse resp = (HttpWebResponse)wr.GetResponse();
                using (StreamReader sr = new StreamReader(resp.GetResponseStream()))
                {
                    string valid = sr.ReadLine();
                    if (valid != null)
                    {
                        if (valid.ToLower().Trim() == "false")
                        {
                            string errorcode = sr.ReadLine();

                            if (errorcode != null)
                            {
                                if (errorcode.ToLower().Trim() != "incorrect-captcha-sol")
                                {
                                    _vr = errorcode;
                                    _errored = true;
                                    return false;
                                }
                            }
                        }

                        return (valid.ToLower().Trim() == "true");
                    }
                    else _vr = "empty web service response";

                    sr.Close();
                    return false;
                }
            }
            catch (Exception caught)
            {
                _errored = true;
                _ex = caught;
            }
            return false;
        }
    }
}