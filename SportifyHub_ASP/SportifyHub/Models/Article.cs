using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SportifyHub.Models
{
    public class Article
    {
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty; // Could be an enum or a separate Category model

        [Required]
        [StringLength(150)]
        public string Author { get; set; } = string.Empty; // Or link to a User model

        public DateTime Date { get; set; }

        [Required]
        [StringLength(1000)]
        public string Summary { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty; // Could be Markdown or HTML

        [Url]
        [StringLength(500)]
        public string? ImageUrl { get; set; }

        // Tags: string[]
        // Store as JSON string or use a related table ArticleTag(ArticleId, TagId) -> Tag(Id, Name)
        public string TagsJson { get; set; } = string.Empty; // e.g. "["tag1", "tag2"]"
    }
}
