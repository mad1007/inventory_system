# Generated by Django 4.1.4 on 2022-12-29 21:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Name')),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Name')),
                ('tel', models.CharField(blank=True, max_length=15, null=True, verbose_name='Phone Number')),
                ('ice', models.CharField(blank=True, max_length=22, null=True, verbose_name='Ice')),
                ('use_tva', models.BooleanField(default=True, verbose_name='Using TVA')),
                ('debt', models.FloatField(default=0, verbose_name='Debt To Pay')),
                ('black_listed', models.BooleanField(default=False, verbose_name='Black Listed')),
            ],
        ),
        migrations.CreateModel(
            name='OrderPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edit_date', models.DateTimeField(auto_created=True, verbose_name='Edit Date')),
                ('creation_date', models.DateTimeField(auto_created=True, verbose_name='Creation Date')),
                ('payment_date', models.DateField(default=django.utils.timezone.now)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edit_date', models.DateTimeField(auto_created=True, verbose_name='Edit Date')),
                ('creation_date', models.DateTimeField(auto_created=True, verbose_name='Creation Date')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edit_date', models.DateTimeField(auto_created=True, verbose_name='Edit Date')),
                ('creation_date', models.DateTimeField(auto_created=True, verbose_name='Creation Date')),
                ('reference', models.CharField(blank=True, max_length=255, unique=True, verbose_name='Reference')),
                ('order_date', models.DateField(default=django.utils.timezone.now, verbose_name='Order Date')),
                ('total_order', models.FloatField(verbose_name='Total Order')),
                ('total_paid', models.FloatField(verbose_name='Total Paid')),
                ('total_tva', models.FloatField(verbose_name='Total Tva')),
                ('is_invoice', models.BooleanField(verbose_name='Is Invoice')),
                ('note', models.CharField(blank=True, max_length=255, null=True, verbose_name='Note')),
                ('draft_invoice', models.BooleanField(default=False, verbose_name='Draft invoice')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Name')),
                ('base_price', models.FloatField(verbose_name='Base Price')),
                ('inventory_level', models.FloatField(verbose_name='Inventory Level')),
                ('inventory_security_level', models.FloatField(default=0, verbose_name='Inventory Security Level')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='supply_management.category', verbose_name='Category Name')),
            ],
        ),
    ]
