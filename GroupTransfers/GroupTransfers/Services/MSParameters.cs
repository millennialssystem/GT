using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupTransfers.Services
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
        public int Value { get; set; }
        /// <summary>
        /// Parameter Stop Procedure
        /// </summary>
        /// <param name="name">Name Parameter</param>
        /// <param name="value">Value Parameter</param>
        public MSParameters(string name, int value)
        {
            Name = name;
            Value = value;
        }
    }
}
