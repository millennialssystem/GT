using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfer2.Services
{
    public class MSParameters
    {
        /// <summary>
        /// Name Parameter
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Value Parameter
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Parameter Stop Procedure
        /// </summary>
        /// <param name="name">Name Parameter</param>
        /// <param name="value">Value Parameter</param>
        public MSParameters(string name, string value)
        {
            Name = name;
            Value = value;
        }
        /// <summary>
        /// Add Parameter
        /// </summary>
        /// <param name="name">Name Parameter</param>
        /// <param name="value">Value Parameter</param>
        public void Add(string name, string value)
        {
            Name = name;
            Value = value;
        }
    }
}
