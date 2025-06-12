using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
// CartItemViewModel is now in the same namespace: SportifyHub.ViewModels

namespace SportifyHub.ViewModels
{
    public class OrderViewModel
    {
        public string? UserId { get; set; }

        [Display(Name = "آدرس کامل ارسال")]
        [Required(ErrorMessage = "لطفا آدرس ارسال را وارد کنید.")]
        public string ShippingAddress { get; set; } = string.Empty;

        public List<CartItemViewModel> CartItems { get; set; } = new List<CartItemViewModel>();
        public decimal TotalAmount { get; set; }
    }
}
