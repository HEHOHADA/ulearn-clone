﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UlearnData;

namespace UlearnAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-preview.3.20181.2");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("UlearnData.Models.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SubscriptionId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("SubscriptionId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("UlearnData.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CourseId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("UlearnData.Models.Module", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CourseId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("UlearnData.Models.Subscription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Level")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("InitialCode")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ModuleId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("CodeTasks");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTaskResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<int?>("CodeTaskId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CodeTaskId");

                    b.HasIndex("GroupId");

                    b.HasIndex("SenderId");

                    b.ToTable("CodeTaskResults");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTaskReview", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CodeTaskResultId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TeacherId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CodeTaskResultId")
                        .IsUnique();

                    b.HasIndex("TeacherId");

                    b.ToTable("CodeTaskReviews");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TaskId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("TestQuestions");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestionAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsRight")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("QuestionId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("TestQuestionAnswers");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestionAnswerResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AnswerId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId");

                    b.HasIndex("GroupId");

                    b.HasIndex("SenderId");

                    b.ToTable("QuestionAnswerResults");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ModuleId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("TestTasks");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestTaskResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderId")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TaskId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("SenderId");

                    b.HasIndex("TaskId");

                    b.ToTable("TestTaskResults");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.VideoTasks.VideoTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ModuleId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("VideoHref")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("VideoTasks");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.VideoTasks.VideoTaskResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderId")
                        .HasColumnType("TEXT");

                    b.Property<int?>("VideoTaskId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("SenderId");

                    b.HasIndex("VideoTaskId");

                    b.ToTable("VideoTaskResults");
                });

            modelBuilder.Entity("UlearnData.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Firstname")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageSrc")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lastname")
                        .HasColumnType("TEXT");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SubscriptionId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("SubscriptionId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("UlearnData.Models.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GroupId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroup");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("UlearnData.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("UlearnData.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UlearnData.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("UlearnData.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UlearnData.Models.Course", b =>
                {
                    b.HasOne("UlearnData.Models.Subscription", "Subscription")
                        .WithMany()
                        .HasForeignKey("SubscriptionId");
                });

            modelBuilder.Entity("UlearnData.Models.Group", b =>
                {
                    b.HasOne("UlearnData.Models.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId");
                });

            modelBuilder.Entity("UlearnData.Models.Module", b =>
                {
                    b.HasOne("UlearnData.Models.Course", "Course")
                        .WithMany("Modules")
                        .HasForeignKey("CourseId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTask", b =>
                {
                    b.HasOne("UlearnData.Models.Module", "Module")
                        .WithMany("CodeTasks")
                        .HasForeignKey("ModuleId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTaskResult", b =>
                {
                    b.HasOne("UlearnData.Models.Tasks.CodeTasks.CodeTask", "CodeTask")
                        .WithMany()
                        .HasForeignKey("CodeTaskId");

                    b.HasOne("UlearnData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("UlearnData.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.CodeTasks.CodeTaskReview", b =>
                {
                    b.HasOne("UlearnData.Models.Tasks.CodeTasks.CodeTaskResult", "Result")
                        .WithOne("Review")
                        .HasForeignKey("UlearnData.Models.Tasks.CodeTasks.CodeTaskReview", "CodeTaskResultId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UlearnData.Models.User", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestion", b =>
                {
                    b.HasOne("UlearnData.Models.Tasks.TestTasks.TestTask", "Task")
                        .WithMany("Questions")
                        .HasForeignKey("TaskId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestionAnswer", b =>
                {
                    b.HasOne("UlearnData.Models.Tasks.TestTasks.TestQuestion", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestQuestionAnswerResult", b =>
                {
                    b.HasOne("UlearnData.Models.Tasks.TestTasks.TestQuestionAnswer", "Answer")
                        .WithMany()
                        .HasForeignKey("AnswerId");

                    b.HasOne("UlearnData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("UlearnData.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestTask", b =>
                {
                    b.HasOne("UlearnData.Models.Module", "Module")
                        .WithMany("TestTasks")
                        .HasForeignKey("ModuleId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.TestTasks.TestTaskResult", b =>
                {
                    b.HasOne("UlearnData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("UlearnData.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.HasOne("UlearnData.Models.Tasks.TestTasks.TestTask", "Task")
                        .WithMany()
                        .HasForeignKey("TaskId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.VideoTasks.VideoTask", b =>
                {
                    b.HasOne("UlearnData.Models.Module", "Module")
                        .WithMany("VideoTasks")
                        .HasForeignKey("ModuleId");
                });

            modelBuilder.Entity("UlearnData.Models.Tasks.VideoTasks.VideoTaskResult", b =>
                {
                    b.HasOne("UlearnData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("UlearnData.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.HasOne("UlearnData.Models.Tasks.VideoTasks.VideoTask", "VideoTask")
                        .WithMany()
                        .HasForeignKey("VideoTaskId");
                });

            modelBuilder.Entity("UlearnData.Models.User", b =>
                {
                    b.HasOne("UlearnData.Models.Subscription", "Subscription")
                        .WithMany()
                        .HasForeignKey("SubscriptionId");
                });

            modelBuilder.Entity("UlearnData.Models.UserGroup", b =>
                {
                    b.HasOne("UlearnData.Models.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupId");

                    b.HasOne("UlearnData.Models.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
