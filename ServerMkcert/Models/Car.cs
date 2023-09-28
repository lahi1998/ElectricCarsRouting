using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ServerMkcert.Models
{
    public class Car
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Nr { get; set; }
        public string Model { get; set; } = string.Empty;
        public int Amount { get; set; }
        public int ChangeAmount { get; set; }
    }
}
