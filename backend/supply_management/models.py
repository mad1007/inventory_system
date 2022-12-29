from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.timezone import now
from django.contrib.auth import get_user_model
# Create your models here.

UserModel = get_user_model()

class Category(models.Model):
    name = models.CharField(_("Name"), max_length=50, unique=True)

    def clean(self):
        self.name = self.name.capitalize()

    def __str__(self) -> str:
        return self.name

class Article(models.Model):
    class Units(models.TextChoices):
        UNIT = ("UNITE", "UNITE")
        KG = ("KG", "KG")
        L= ("L", "L")
        SAC = ("SAC", "SAC")
        BIDOU = ("BIDOU", "BIDOU")
    name = models.CharField(_("Name"), max_length=50, unique=True)
    unit = models.CharField(max_length=10, choices=Units.choices, default=Units.UNIT)
    base_price = models.FloatField(_("Base Price"))
    inventory_level = models.FloatField(_("Inventory Level"))
    inventory_security_level = models.FloatField(_("Inventory Security Level"), default=0)
    category = models.ForeignKey(Category, verbose_name=_("Category Name"), on_delete=models.SET_NULL, null=True)

    def clean(self):
        self.name = self.name.capitalize()

    def __str__(self) -> str:
        return self.name

class Supplier(models.Model):
    # TODO: on save set name to uppercase to handle the unique constraint
    name = models.CharField(_("Name"), max_length=50, unique=True)
    tel = models.CharField(_("Phone Number"), max_length=15, null=True, blank=True)
    ice = models.CharField(_("Ice"), max_length=22, null=True, blank=True)
    use_tva = models.BooleanField(_("Using TVA"), default=True)
    debt = models.FloatField(_("Debt To Pay"), default=0)
    black_listed = models.BooleanField(_("Black Listed"), default=False)

    def clean(self):
        self.name = self.name.capitalize()

    def __str__(self) -> str:
        return self.name

class Order(models.Model):
    # TODO: generate auto id if not exist
    reference = models.CharField(_("Reference"), max_length=255, null=False, blank=True, unique=True)
    creation_date = models.DateTimeField(_("Creation Date"), auto_created=True)
    edit_date = models.DateTimeField(_("Edit Date"), auto_created=True)
    created_by = models.ForeignKey(UserModel(), null=True, on_delete=models.SET_NULL)
    order_date = models.DateField(_("Order Date"), default=now)
    total_order = models.FloatField(_("Total Order"))
    total_paid = models.FloatField(_("Total Paid"))
    total_tva = models.FloatField(_("Total Tva"))
    is_invoice = models.BooleanField(_("Is Invoice"), False)
    note = models.CharField(_("Note"), max_length=255, null=True, blank=True)
    # Draft invoice dosent update the supplier debt
    draft_invoice = models.BooleanField(_("Draft invoice"), default=False)

class OrderPayment(models.Model):
    creation_date = models.DateTimeField(_("Creation Date"), auto_created=True)
    edit_date = models.DateTimeField(_("Edit Date"), auto_created=True)
    created_by = models.ForeignKey(UserModel(), verbose_name=_("Created By"), null=True, on_delete=models.SET_NULL)
    payment_date = models.DateField(default=now)
    payment_amount = models.F

class OrderDetail(models.Model):
    creation_date = models.DateTimeField(_("Creation Date"), auto_created=True)
    edit_date = models.DateTimeField(_("Edit Date"), auto_created=True)
    created_by = models.ForeignKey(UserModel(), null=True, on_delete=models.SET_NULL)
